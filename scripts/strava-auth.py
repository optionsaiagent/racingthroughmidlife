#!/usr/bin/env python3
"""One-time Strava authorization for one athlete. Run once for Jay, once for Michelle:

    python3 scripts/strava-auth.py jay
    python3 scripts/strava-auth.py michelle

It prints a Strava URL. Open it while logged in as that athlete, click Authorize, and you'll land on a
localhost page that won't load (that's expected). Copy the whole URL from the address bar and paste it
back here. The script swaps the code for a refresh token and stores it in .env.local (gitignored).
"""
import sys, urllib.parse
from strava_common import load_env, save_env_value, post

who = (sys.argv[1] if len(sys.argv) > 1 else "").upper()
if who not in ("JAY", "MICHELLE"):
    raise SystemExit("Usage: python3 scripts/strava-auth.py jay|michelle")
env = load_env()
cid, secret = env.get("STRAVA_CLIENT_ID"), env.get("STRAVA_CLIENT_SECRET")
if not (cid and secret):
    raise SystemExit("First put STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET in .env.local (copy .env.example). See README, 'Strava setup'.")

params = {"client_id": cid, "response_type": "code", "redirect_uri": "http://localhost/exchange_token",
          "approval_prompt": "force", "scope": "read,activity:read_all"}
print(f"\n1. Log in to strava.com as {who.title()}.")
print("2. Open this URL and click Authorize:\n")
print("   https://www.strava.com/oauth/authorize?" + urllib.parse.urlencode(params))
print("\n3. You'll land on a localhost page that doesn't load. That's fine. Copy the full URL from the address bar.\n")
pasted = input("Paste that URL here: ").strip()
qs = urllib.parse.parse_qs(urllib.parse.urlparse(pasted).query)
code = (qs.get("code") or [None])[0]
if not code:
    raise SystemExit("Couldn't find a code= in what you pasted. Try again.")
tok = post("https://www.strava.com/oauth/token", {"client_id": cid, "client_secret": secret, "code": code, "grant_type": "authorization_code"})
save_env_value(f"STRAVA_REFRESH_TOKEN_{who}", tok["refresh_token"])
name = tok.get("athlete", {}).get("firstname", who.title())
print(f"\nDone. {name}'s Strava is connected. Token saved to .env.local (never commit that file).")
print("Test it: python3 scripts/strava-week.py")
