#!/usr/bin/env python3
"""What happened this week? Checks the timing sites and the YouTube channel for anything new
involving Jay Miller or Michelle Miller, and compares against what the site already has.

Usage: python3 scripts/check-week.py [--days 9]
Prints a plain summary. Never writes to the site.
"""
import json, re, sys, html, urllib.request, urllib.parse, datetime, pathlib, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
DAYS = int(sys.argv[sys.argv.index("--days") + 1]) if "--days" in sys.argv else 9
NAMES = ("JAY MILLER", "MICHELLE MILLER")
UA = {"User-Agent": "Mozilla/5.0"}

def get(url, timeout=40):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout).read().decode("utf-8", "ignore")

def clean(c):
    return html.unescape(re.sub(r"<[^>]+>", "", c)).strip()

today = datetime.date.today()
since = today - datetime.timedelta(days=DAYS)
known = json.load(open(ROOT / "content/results.json"))
known_dates = {r["date"] for r in known if r.get("date")}
findings = []

# ---- 1. Timeline Hawaii: events in the window
print(f"Checking Timeline Hawaii for events since {since} ...")
year_pages = {f"https://timelinehawaii.com/{y}-results/" for y in {since.year, today.year}}
event_urls = set()
for yp in year_pages:
    for p in ["", "page/2/"]:
        try:
            event_urls |= set(re.findall(r"https://timelinehawaii\.com/(20\d\d)/(\d\d)/(\d\d)/[^\"]+/", get(yp + p)) and
                              re.findall(r"https://timelinehawaii\.com/20\d\d/\d\d/\d\d/[^\"]+/", get(yp + p)))
        except Exception:
            pass
for u in sorted(event_urls):
    m = re.search(r"/(20\d\d)/(\d\d)/(\d\d)/", u)
    d = datetime.date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    if not (since <= d <= today):
        continue
    try:
        s = get(u)
    except Exception:
        continue
    for row in re.findall(r"<tr[^>]*>.*?</tr>", s, re.S):
        cells = [clean(c) for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)]
        j = " ".join(cells).upper()
        if any(n in j for n in NAMES):
            findings.append({"source": "timelinehawaii", "date": d.isoformat(), "url": u, "row": cells,
                             "already_on_site": d.isoformat() in known_dates})
    time.sleep(0.3)

# ---- 2. IRONMAN: any result under either name that the site doesn't have
print("Checking IRONMAN results by name ...")
for fn in ("Jay Miller", "Michelle Miller"):
    inner = f"https://api.competitor.com/web/results?$filter=wtc_ContactId/fullname eq '{fn}'&$orderby=wtc_finishrankoverall"
    try:
        d = json.loads(get("https://labs-v2.competitor.com/api/results-proxy?url=" + urllib.parse.quote(inner, safe="") + "&pageSize=500", 120))
    except Exception as e:
        print("  IRONMAN lookup failed:", e); break
    have = {r["event"] for r in known}
    for v in d.get("value", []):
        c = v.get("wtc_ContactId") or {}
        if (c.get("address1_city") or "").upper() != "HONOLULU":
            continue
        ev = (v.get("wtc_EventId") or {}).get("wtc_name")
        if ev and ev not in have:
            findings.append({"source": "ironman", "event": ev, "athlete": fn, "time": v.get("wtc_finishtimeformatted"),
                             "agegroup": v.get("_wtc_agegroupid_value_formatted"), "agrank": v.get("wtc_finishrankgroup"),
                             "swim": v.get("wtc_swimtimeformatted"), "bike": v.get("wtc_biketimeformatted"), "run": v.get("wtc_runtimeformatted"),
                             "already_on_site": False})

# ---- 3. YouTube: videos not yet in content/videos.json
print("Checking the YouTube channel ...")
try:
    h = get("https://www.youtube.com/@racingthroughmidlife/videos")
    i = h.find("var ytInitialData = "); j = h.find(";</script>", i)
    data = json.loads(h[i + len("var ytInitialData = "):j])
    vids = {}
    def walk(o):
        if isinstance(o, dict):
            if "lockupViewModel" in o:
                v = o["lockupViewModel"]
                try:
                    vids[v["contentId"]] = v["metadata"]["lockupMetadataViewModel"]["title"]["content"]
                except Exception:
                    pass
            for x in o.values(): walk(x)
        elif isinstance(o, list):
            for x in o: walk(x)
    walk(data)
    have_ids = {v["id"] for v in json.load(open(ROOT / "content/videos.json"))}
    for vid, title in vids.items():
        if vid not in have_ids:
            findings.append({"source": "youtube", "id": vid, "title": title, "already_on_site": False})
except Exception as e:
    print("  YouTube check failed (it rate-limits; try again later):", e)

# ---- report
print()
if not findings:
    print(f"Nothing new in the last {DAYS} days on Timeline Hawaii, IRONMAN, or YouTube.")
else:
    print(f"Found {len(findings)} item(s):")
    for f in findings:
        print(" -", json.dumps(f, ensure_ascii=False))
print()
print("Not checked automatically (need the browser): PSE/acho, Sportstats, RunSignup, RaceResult, Webscorer. See .claude/skills/sunday/results-sources.md.")
