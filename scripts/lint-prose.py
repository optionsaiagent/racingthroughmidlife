#!/usr/bin/env python3
"""Prose lint for racingthroughmidlife.com. Run before build (warning) or with --strict (fails).

Checks, over content/**/*.md (frontmatter title/deck/week + body, minus code, YAML data lists,
and quoted activity names) and over string literals / JSX text in src/**/*.tsx and src/lib/*.ts:
  1. em dashes, en dashes, and spaced hyphens used as punctuation
  2. curly apostrophes and quotes (the site uses straight ones in source; JSX entities are fine)
  3. signature phrases (content/phrases.json): more than once on a page, or on a page that isn't the phrase's canonical home
  4. punch-style tells in content: a question answered in one word, "Not X. Not Y.", "It's not X. It's Y."
"""
import re, sys, json, pathlib, glob

ROOT = pathlib.Path(__file__).resolve().parent.parent
STRICT = "--strict" in sys.argv
cfg = json.load(open(ROOT / "content/phrases.json"))
problems = []

def prose_from_md(path, text):
    m = re.match(r"---\n(.*?)\n---\n?(.*)", text, re.S)
    fm, body = (m.group(1), m.group(2)) if m else ("", text)
    fields = []
    for key in ("title", "deck", "week", "result", "location", "event", "distance"):
        mm = re.search(rf"^{key}: (.*)$", fm, re.M)
        if mm: fields.append(mm.group(1))
    for key in ("dos", "donts"):
        mm = re.search(rf"^{key}:\n((?:  - .*\n?)+)", fm, re.M)
        if mm: fields += [l.strip()[2:] for l in mm.group(1).splitlines()]
    body = re.sub(r"```.*?```", "", body, flags=re.S)
    body = re.sub(r"`[^`]*`", "", body)
    return "\n".join(fields) + "\n" + body

def prose_from_tsx(path, text):
    out = []
    out += re.findall(r'"((?:[^"\\]|\\.){12,})"', text)          # double-quoted strings
    out += re.findall(r"'((?:[^'\\]|\\.){12,})'", text)          # single-quoted strings
    out += re.findall(r">([^<>{}]{12,})<", text)                  # JSX text
    keep = [s for s in out if re.search(r"[a-z]{3,} [a-z]{2,}", s) and not re.search(r"[{}=();]|=>|\$\{", s) and "className" not in s and not s.startswith("/")]
    return "\n".join(keep)

def check(path, prose):
    rel = str(path.relative_to(ROOT))
    for i, line in enumerate(prose.splitlines(), 1):
        stripped = re.sub(r"\b\d{4} – \d{4}\b", "", line)  # year ranges may keep an en dash
        if "—" in stripped or "–" in stripped or "&mdash;" in stripped or "&ndash;" in stripped:
            problems.append((rel, f"dash: {line.strip()[:90]}"))
        if re.search(r"\S - \S", line) and not re.search(r"Zwift - |Race - |^\s*- ", line):
            problems.append((rel, f"spaced hyphen: {line.strip()[:90]}"))
        if re.search(r"[’‘“”]", line):
            problems.append((rel, f"curly quote: {line.strip()[:90]}"))
        if rel.startswith("content/") and re.search(r"\?\s+(No|Yes|Nope|Not really|Honestly, no)[.,]", line):
            problems.append((rel, f"punch (question, one-word answer): {line.strip()[:90]}"))
        if rel.startswith("content/") and re.search(r"\bNot (a|an|the|my|our) [^.]{1,30}\. Not (a|an|the|my|our) ", line):
            problems.append((rel, f"punch (Not X. Not Y.): {line.strip()[:90]}"))
        if rel.startswith("content/") and re.search(r"\b(It|That|This)'s not [^.]{1,40}\. (It|That|This)'s ", line):
            problems.append((rel, f"punch (It's not X. It's Y.): {line.strip()[:90]}"))
    for ph in cfg["phrases"]:
        hits = re.findall(ph["pattern"], prose, re.I)
        if not hits: continue
        homes = ph["canonical"] if isinstance(ph["canonical"], list) else [ph["canonical"]]
        canonical = rel in homes
        if len(hits) > 1 and not canonical:
            problems.append((rel, f"phrase '{ph['label']}' used {len(hits)} times (max 1)"))
        if not canonical:
            problems.append((rel, f"phrase '{ph['label']}' belongs on {', '.join(homes)}; link to it instead"))

for p in sorted(glob.glob(str(ROOT / "content/**/*.md"), recursive=True)):
    check(pathlib.Path(p), prose_from_md(p, open(p).read()))
for p in sorted(glob.glob(str(ROOT / "src/**/*.tsx"), recursive=True) + glob.glob(str(ROOT / "src/lib/*.ts"))):
    check(pathlib.Path(p), prose_from_tsx(p, open(p).read()))

if problems:
    by = {}
    for rel, msg in problems: by.setdefault(rel, []).append(msg)
    for rel, msgs in by.items():
        print(rel)
        for m in msgs: print("   -", m)
    print(f"\n{len(problems)} prose issue(s) in {len(by)} file(s).", "Failing (--strict)." if STRICT else "Warning only; run with --strict to fail the build.")
    sys.exit(1 if STRICT else 0)
print("prose lint: clean")
