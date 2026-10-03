#!/usr/bin/env python3
"""Build a dept guide from the shared template (electric/index.html is the reference copy).

guides/<slug>/meta.json  -> title, badge, color var, sub, description, footer
guides/<slug>/body.html  -> the <section class="panel"> blocks (must include p-start, p-drills, p-scen)
guides/<slug>/data.js    -> TABS, CARDS, QS, CHAINS, SCN, CK  (plain `var X=[...];` declarations)
guides/<slug>/extra.css  -> optional extra CSS
guides/<slug>/sims.js    -> optional self-contained IIFEs appended after the core
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.dirname(os.path.abspath(__file__))

ref = open(os.path.join(ROOT, "electric/index.html")).read()

head_css = ref[ref.index("<style>"):ref.index("</style>") + len("</style>")]
cs_start = ref.index("/* ═══════════ call sheet")
cs_end = ref.index("})();", cs_start) + len("})();")
callsheet = ref[cs_start:cs_end]

core_start = ref.index('(function(){\n"use strict";')
core_end = ref.index("/* ═══════════ gain structure simulator")
core = ref[core_start:core_end].rstrip()
assert core.endswith("})();")
core = core[len('(function(){\n"use strict";'):-len("})();")]

# strip the data declarations so each guide supplies its own
for name in ["TABS", "CARDS", "QS", "CHAINS", "SCN", "CK"]:
    pat = re.compile(r"var %s=\[.*?\n?\];\n" % name, re.S)
    core, n = pat.subn("", core, count=1)
    assert n == 1, name
core = core.replace('"electric_tab"', 'STORE+"_tab"').replace('"electric_ck"', 'STORE+"_ck"')
assert "electric" not in core, "electric-specific text left in core"

# show the chain's 'why' line once a chain is complete
core = core.replace(
    """'<span style="color:var(--audio);font-weight:600;font-size:14px">Chain complete.</span>');""",
    """'<span style="color:var(--audio);font-weight:600;font-size:14px">Chain complete.</span>');
          if(c.w) document.getElementById("cFoot").insertAdjacentHTML("afterend",'<p class="expl">'+c.w+'</p>');""")
assert "if(c.w)" in core


def build(slug):
    g = os.path.join(HERE, "guides", slug)
    meta = json.load(open(os.path.join(g, "meta.json")))
    body = open(os.path.join(g, "body.html")).read().strip()
    data = open(os.path.join(g, "data.js")).read().strip()
    extra_css = open(os.path.join(g, "extra.css")).read() if os.path.exists(os.path.join(g, "extra.css")) else ""
    sims = open(os.path.join(g, "sims.js")).read().strip() if os.path.exists(os.path.join(g, "sims.js")) else ""

    for pid in ["p-start", "p-drills", "p-scen"]:
        assert 'id="%s"' % pid in body, (slug, pid)

    css = head_css
    if extra_css:
        css = css.replace("</style>", "\n/* ---------- %s ---------- */\n%s\n</style>" % (slug, extra_css.strip()))

    out = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{meta['title']}</title>
<meta name="description" content="{meta['description']}">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<meta name="googlebot" content="noindex, nofollow">
<meta name="theme-color" content="#0d1117">
{css}
</head>
<body>

<header>
  <div class="inner">
    <a class="homelink" href="../">← All guides</a>
    <div class="badge" style="color:var({meta['color']});border-color:var({meta['color']})">Live Events · {meta['badge']}</div>
    <h1>{meta['title']}</h1>
    <p class="sub">{meta['sub']}</p>
  </div>
</header>

<nav role="tablist"><div class="navinner" id="nav"></div></nav>

<div class="wrap">
{body}
<footer>
  {meta['title']} · {meta.get('footer', 'Reference and drill tool for live event technicians')}<br>
  Gear illustrations are simplified diagrams for identification, not manufacturer specifications.
</footer>
</div>

<script>
{callsheet}


(function(){{
"use strict";
var STORE={json.dumps(slug)};
{data}
{core}
}})();

{sims}
</script>
</body>
</html>
"""
    assert "http://" not in out.replace("http://www.w3.org/2000/svg", "")
    assert "https://" not in out, "external reference in " + slug
    os.makedirs(os.path.join(ROOT, slug), exist_ok=True)
    open(os.path.join(ROOT, slug, "index.html"), "w").write(out)
    print(slug, len(out), "bytes")


if __name__ == "__main__":
    for s in sys.argv[1:]:
        build(s)
