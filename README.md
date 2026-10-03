# Live Event Work Guides

Interactive study guides for live event production. Built to drill, not to read.

**Live site:** https://thenbafinals.github.io/Local-33-Work-Guides/

## Guides

| Guide | Path | Covers |
|---|---|---|
| Corporate AV | `/av/` | Combined audio + video for corporate rooms |
| Audio | `/audio/` | Cables, mics, wireless, consoles, gain structure |
| Video | `/video/` | HDMI/SDI, switchers, converters, displays |
| LED Wall | `/ledwall/` | Panels, processors, data and power runs |
| Lighting | `/lighting/` | Fixtures, DMX, consoles, truss cabling |
| Electric | `/electric/` | Distro, feeder, cam-lok, Socapex, phase balance |
| Backline | `/backline/` | Drum mics, drum sub, DI boxes, XLR runs, input lists |
| Rigging | `/rigging/` | Hardware, arena points and motors, bridle math, fly systems, truss, inspection |

Planned: Carpentry, Special FX.

## How they work

Each guide is a single self-contained HTML file. No frameworks, no CDN, no external
requests — once a page loads it keeps working with no signal. Open any guide on a phone
and use Share > Add to Home Screen to install it.

Every guide includes reference tabs plus flashcards, a quiz with explanations,
signal-chain builders, and real-gig scenarios. The audio guides also include a
gain-structure simulator.

## Adding a guide

Guides are generated from a shared template so they all look and behave the same.
The template is the Electric guide; `tools/build.py` pulls its styles and core
drill code and combines them with each guide's own content in `tools/guides/<dept>/`
(`meta.json`, `body.html`, `data.js`, optional `sims.js` and `extra.css`).

    python3 tools/build.py rigging

writes `rigging/index.html`. Then add the guide's card to the hub page and a row above.
