"""Shared bits for the Strava scripts. Reads .env.local; never prints secrets."""
import json, os, pathlib, urllib.request, urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENV_PATH = ROOT / ".env.local"
ATHLETES = ("JAY", "MICHELLE")

def load_env():
    env = {}
    if ENV_PATH.exists():
        for line in ENV_PATH.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    env.update({k: v for k, v in os.environ.items() if k.startswith("STRAVA_")})
    return env

def save_env_value(key, value):
    lines = ENV_PATH.read_text().splitlines() if ENV_PATH.exists() else []
    out, done = [], False
    for line in lines:
        if line.split("=", 1)[0].strip() == key:
            out.append(f"{key}={value}"); done = True
        else:
            out.append(line)
    if not done:
        out.append(f"{key}={value}")
    ENV_PATH.write_text("\n".join(out) + "\n")

def post(url, data):
    body = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data=body, headers={"User-Agent": "racingthroughmidlife-sunday"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())

def get(url, token, params=None):
    if params:
        url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}", "User-Agent": "racingthroughmidlife-sunday"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())

def access_token_for(env, who):
    """Exchange the stored refresh token for a short-lived access token. Stores the rotated refresh token."""
    cid, secret = env.get("STRAVA_CLIENT_ID"), env.get("STRAVA_CLIENT_SECRET")
    refresh = env.get(f"STRAVA_REFRESH_TOKEN_{who}")
    if not (cid and secret):
        raise SystemExit("Missing STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET in .env.local. See README, 'Strava setup'.")
    if not refresh:
        raise SystemExit(f"No STRAVA_REFRESH_TOKEN_{who} in .env.local yet. Run: python3 scripts/strava-auth.py {who.lower()}")
    tok = post("https://www.strava.com/oauth/token", {"client_id": cid, "client_secret": secret, "grant_type": "refresh_token", "refresh_token": refresh})
    if tok.get("refresh_token") and tok["refresh_token"] != refresh:
        save_env_value(f"STRAVA_REFRESH_TOKEN_{who}", tok["refresh_token"])
    return tok["access_token"]
