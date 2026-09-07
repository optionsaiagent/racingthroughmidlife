#!/usr/bin/env python3
"""The week on Strava, for both athletes. Used by /sunday.

    python3 scripts/strava-week.py            # last 7 days
    python3 scripts/strava-week.py --days 14
    python3 scripts/strava-week.py --json     # machine-readable
    python3 scripts/strava-week.py --yaml     # a `training:` block to paste into a Sunday note's frontmatter
    python3 scripts/strava-week.py --yaml --end 2026-09-06   # Monday to Sunday ending on that date

Prints each activity (day, sport, title, distance, time, climb, avg HR if shared) and per-sport totals.
Read-only. Never writes to Strava or the site.
"""
import sys, json, time, datetime
from strava_common import load_env, access_token_for, get, ATHLETES

DAYS = int(sys.argv[sys.argv.index("--days") + 1]) if "--days" in sys.argv else 7
AS_JSON = "--json" in sys.argv
AS_YAML = "--yaml" in sys.argv
# --end YYYY-MM-DD makes the window end on that day (inclusive); default is now. Use it to line a note up Monday to Sunday.
END = datetime.date.fromisoformat(sys.argv[sys.argv.index("--end") + 1]) if "--end" in sys.argv else None
if END:
    end_ts = int(datetime.datetime.combine(END + datetime.timedelta(days=1), datetime.time()).timestamp())
    after = end_ts - DAYS * 86400
else:
    end_ts = int(time.time()); after = end_ts - DAYS * 86400

def mi(m): return m / 1609.344
def hms(s):
    s = int(s); h, r = divmod(s, 3600); m, s = divmod(r, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"

env = load_env()
report = {}
for who in ATHLETES:
    try:
        token = access_token_for(env, who)
    except SystemExit as e:
        print(f"[{who.title()}] {e}"); continue
    acts, page = [], 1
    while True:
        batch = get("https://www.strava.com/api/v3/athlete/activities", token, {"after": after, "per_page": 100, "page": page})
        acts += [a for a in batch if int(datetime.datetime.fromisoformat(a["start_date"].replace("Z", "+00:00")).timestamp()) <= end_ts]
        if len(batch) < 100: break
        page += 1
    acts.sort(key=lambda a: a["start_date_local"])
    rows, totals = [], {}
    for a in acts:
        sport = a.get("sport_type") or a.get("type")
        d = a["start_date_local"][:10]
        row = {"date": d, "start": a["start_date_local"], "sport": sport, "name": a.get("name"), "miles": round(mi(a.get("distance", 0)), 1),
               "moving": hms(a.get("moving_time", 0)), "moving_sec": int(a.get("moving_time", 0)), "climb_ft": int(a.get("total_elevation_gain", 0) * 3.28084),
               "avg_hr": a.get("average_heartrate"), "trainer": a.get("trainer", False), "race": a.get("workout_type") in (1, 11)}
        rows.append(row)
        t = totals.setdefault(sport, {"n": 0, "miles": 0.0, "sec": 0})
        t["n"] += 1; t["miles"] += mi(a.get("distance", 0)); t["sec"] += a.get("moving_time", 0)
    # brick: a run that starts within 3 hours of the end of a ride the same day
    from datetime import datetime as _dt
    def ts(x): return _dt.fromisoformat(x["start"].replace("Z", ""))
    for i, r in enumerate(rows):
        if r["sport"] in ("Run", "TrailRun"):
            for prev in rows[:i]:
                if prev["date"] == r["date"] and prev["sport"] in ("Ride", "VirtualRide"):
                    gap = (ts(r) - ts(prev)).total_seconds() - prev["moving_sec"]
                    if -300 < gap < 3 * 3600:
                        r["brick"] = True; prev["brick_bike"] = True
    report[who.title()] = {"activities": rows, "totals": {k: {"count": v["n"], "miles": round(v["miles"], 1), "time": hms(v["sec"])} for k, v in totals.items()}}

if AS_JSON:
    print(json.dumps(report, indent=1)); sys.exit()

SPORT_LABEL = {"VirtualRide": "Trainer", "Ride": "Ride", "Run": "Run", "Swim": "Swim", "Walk": "Walk", "Yoga": "Yoga",
               "HighIntensityIntervalTraining": "HIIT", "WeightTraining": "Gym", "Workout": "Workout", "Hike": "Hike", "TrailRun": "Trail run"}
if AS_YAML:
    def q(x): return '"' + str(x).replace('"', "'") + '"'
    end_day = END or datetime.date.today()
    start = (end_day - datetime.timedelta(days=DAYS - 1)).isoformat(); end = end_day.isoformat()
    print("training:")
    print(f"  from: {q(start)}")
    print(f"  to: {q(end)}")
    for who, r in report.items():
        print(f"  {who.lower()}:")
        print("    totals:")
        for k, v in r["totals"].items():
            print(f"      - sport: {q(SPORT_LABEL.get(k, k))}")
            print(f"        count: {v['count']}")
            if v["miles"]: print(f"        miles: {v['miles']}")
            print(f"        time: {q(v['time'])}")
        print("    days:")
        bydate = {}
        for a in r["activities"]: bydate.setdefault(a["date"], []).append(a)
        for d in sorted(bydate):
            print(f"      - date: {q(d)}")
            print("        sessions:")
            for a in bydate[d]:
                print(f"          - sport: {q(SPORT_LABEL.get(a['sport'], a['sport']))}")
                print(f"            name: {q(a['name'])}")
                if a["miles"]: print(f"            miles: {a['miles']}")
                print(f"            time: {q(a['moving'])}")
                if a.get("brick"): print("            brick: true")
    sys.exit()

since = ((END or datetime.date.today()) - datetime.timedelta(days=DAYS - 1)).isoformat()
print(f"Strava, last {DAYS} days (since {since})\n")
for who, r in report.items():
    print(f"== {who}")
    if not r["activities"]:
        print("   nothing logged"); continue
    for a in r["activities"]:
        hr = f"  {a['avg_hr']:.0f} bpm" if a.get("avg_hr") else ""
        flag = "  [race]" if a["race"] else ("  [brick]" if a.get("brick") else ("  [trainer]" if a["trainer"] else ""))
        print(f"   {a['date']}  {a['sport']:<14} {a['miles']:>5} mi  {a['moving']:>7}  {a['climb_ft']:>5} ft{hr}  {a['name']}{flag}")
    print("   totals: " + "; ".join(f"{k} {v['count']}x, {v['miles']} mi, {v['time']}" for k, v in r["totals"].items()))
    print()
