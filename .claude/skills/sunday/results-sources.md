# Where the official results live

Verified 2026-09-04. Everything found so far is in `content/results.json` with a source URL per row. The browser-only sites need the Claude Browser pane; the rest work from `curl` or Python.

- **Timeline Hawaii** (timelinehawaii.com): year index pages `/2023-results/` etc. (paginated `/page/2/`), each event page embeds a full HTML results table. Easiest source; sweep with curl + regex.
- **Pacific Sport Events** (pseresults.com, Wix): posts link to `publish.acho.io/...?race=<id>` (2023), `my.raceresult.com/<id>` (2024), `sportstats.one/results/<id>` (Honolulu Marathon), `runsignup.com` (Honolulu Tri 2024), dot.vision (Roughwater 2024, Oahu Pentathlon). acho pages need the browser: set First/Last Name inputs, click Search, read innerText (slow to load; poll for table rows first).
- **RunSignup REST**: `/Rest/race/{id}/results/get-results?format=json&event_id=&individual_result_set_id=&page=&num=50` (num caps at 50; `search` param ignored). Honolulu Tri race 164857.
- **RaceResult**: `/{id}/RRPublish/data/config?page=results&noVisitor=1` gives `key`; then `/RRPublish/data/list?key=&listname=Online|Final&contest=N`.
- **Webscorer**: `racedetails?raceid=` returns full HTML tables (race page itself is JS). Dick Evans: 2022=288063, 2024=363439, 2025=402757, 2026=444847; 2023 not found. Kaena Firecracker 2024=357968.
- **Sportstats** (Honolulu Marathon): browser only; reject cookie banner, open Filter, type in "Search name or bib". IDs: 2022=140524, 2023=130133, 2024=142773, 2025 leaderboard 145511.
- **IRONMAN**: `https://labs-v2.competitor.com/api/results-proxy?url=<encoded OData>&pageSize=2000` where OData = `https://api.competitor.com/web/results?$filter=_wtc_eventid_value eq <subevent-guid> and wtc_AgeGroupId/wtc_agegroupname ne 'ODIV'&$orderby=wtc_finishrankoverall`. Name filter also works: `$filter=wtc_ContactId/fullname eq 'Jay Miller'` (filter city == Honolulu; many other Millers).
- Dead ends: Athlinks (Great Aloha Run) blocks both curl and the browser pane; Race Roster (Akahai, Ku'ikahi 2023) has no public results page; YouTube descriptions rate-limit after a few requests.
