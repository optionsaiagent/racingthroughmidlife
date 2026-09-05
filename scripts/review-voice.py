#!/usr/bin/env python3
"""Compare rewritten content files against git HEAD: lost internal links, missing bylines,
voice tells, and any digits/times that appear in the new text but not the old (possible invented facts)."""
import re, subprocess, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
files = [l for l in subprocess.run(["git","diff","--name-only","HEAD","--","content/"],capture_output=True,text=True,cwd=ROOT).stdout.split() if l.endswith(".md")]
problems = 0
for f in files:
    old = subprocess.run(["git","show",f"HEAD:{f}"],capture_output=True,text=True,cwd=ROOT).stdout
    new = (ROOT/f).read_text()
    issues = []
    ol = set(re.findall(r"\]\((/[^)]+)\)", old)); nl = set(re.findall(r"\]\((/[^)]+)\)", new))
    if ol - nl: issues.append(f"lost links: {sorted(ol-nl)}")
    if not re.search(r"^author: (Jay|Michelle)$", new, re.M): issues.append("no author line")
    if "—" in new: issues.append("em dash")
    if "!" in new.split("---",2)[-1]: issues.append("exclamation point")
    if re.search(r"^## What we'?d tell a friend", new, re.M|re.I): issues.append("tell-a-friend header")
    for tell in ["here's the thing","that's the whole point","at the end of the day","let's be honest","my husband"]:
        if tell in new.lower(): issues.append(f"tell: {tell}")
    # numbers/times in new body not present anywhere in old file
    body_new = new.split("---",2)[-1]; 
    nums_new = set(re.findall(r"\b\d[\d:.,]*\b", body_new)); nums_old = set(re.findall(r"\b\d[\d:.,]*\b", old))
    extra = sorted(n for n in nums_new - nums_old if len(n) > 1)
    if extra: issues.append(f"new numbers not in old file: {extra}")
    # frontmatter drift: compare keys other than author/title/deck
    def fm(s):
        m = re.match(r"---\n(.*?)\n---", s, re.S); return m.group(1) if m else ""
    fo, fn = fm(old), fm(new)
    keys_o = set(re.findall(r"^([a-zA-Z]+):", fo, re.M)); keys_n = set(re.findall(r"^([a-zA-Z]+):", fn, re.M))
    if keys_o - keys_n: issues.append(f"frontmatter keys lost: {sorted(keys_o-keys_n)}")
    if issues:
        problems += 1; print(f"{f}\n  - " + "\n  - ".join(issues))
print(f"\n{len(files)} changed files, {problems} with issues")
