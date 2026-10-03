# Local 33 Work Guides — Project Brief for Claude Code

## Purpose
Local copy of my GitHub repo: https://github.com/TheNBAFinals/Local-33-Work-Guides
Live site (GitHub Pages): https://thenbafinals.github.io/Local-33-Work-Guides/
GitHub = the permanent home for every IATSE Local 33 study guide. The Claude "Local 33 Study Hub"
project is where guides get drafted; finished versions land here and get pushed.

## First-time setup (if this folder isn't a git repo yet)
Clone the repo INTO this folder (keep this CLAUDE.md and inbox/), log in with `gh auth login`.

## Repo layout (keep this structure — it already exists)
- index.html            Hub landing page with a card for every department
- av/index.html         Corporate AV (Qu-16, gain simulator)
- audio/index.html      Audio
- video/index.html      Video
- ledwall/index.html    LED Wall
- lighting/index.html   Lighting
- electric/index.html   Electric (distro, feeder, Socapex, trainers)
- backline/index.html    Backline (drum sub patch trainer)
- rigging/index.html     Rigging (bridle trainer, tag-it-out inspection drill)
- (to add) carpentry/, sfx/
- tools/build.py         Generator: `python3 tools/build.py <dept>` builds <dept>/index.html from
                         tools/guides/<dept>/ (meta.json, body.html, data.js, sims.js, extra.css)
                         using electric/index.html as the shared template. Edit sources there, then rebuild.
- README.md             Guide table — keep it in sync with the hub

## Rules
- Each guide = one self-contained offline HTML file at <dept>/index.html, built from the shared template
  so all guides look/behave the same. No CDN, no external requests.
- New department = new folder + index.html + a card on the hub + a row in README.
- Every guide: reference tabs, flashcards, quiz w/ explanations, signal-chain builders, real-gig scenarios.
- Ground content in gear I've actually worked with (Palladium etc.) and my class notes/photos.
- When I drop files into ./inbox/: figure out which guide each belongs to, MERGE new content into the
  existing guide (don't overwrite newer work), update hub + README, show me a diff summary, then commit + push.
- Never push anything personal (IDs, pay stubs, account info).

## LOCKED FIELD STANDARD — Cam-lok (verified by CJ, Oct 2026)
- Hook-up STARTS AT THE GROUND END of the panel and works across: GROUND (green) first, NEUTRAL (white)
  second, then the hot legs in the colour order they sit on that distro, going away from ground.
- Strike works BACK TOWARD THE GROUND (hook-up in reverse): the hot leg farthest from ground first, then
  NEUTRAL second to last, GROUND LAST.
- Ground is usually on the left (so hook-up is left to right), but some panels have it on the right —
  e.g. the rack distro photo in electric/ reads black, red, blue, white, green. Then hook-up is right to left.
  (Confirmed by CJ, Oct 3 2026 — replaces "hot legs in any order" and the fixed "left to right" wording.)
- Never teach a fixed phase order (Black/Red/Blue or Blue/Red/Black) as a rule; the panel layout sets it.

## ✅ FIRST FIX TASK — DONE Oct 2, 2026 (commits 4a3c864, 97313fa)
Kept for the record; nothing left to do. The fix follows the updated LOCKED FIELD STANDARD above
(start at the ground end, strike back toward it), not the older "hots in any order" wording below.
- electric/index.html (GitHub) — the Cam-Lok sequence trainer, quiz answers and flashcards force
  "ground, neutral, A, B, C". Rewrite so: ground first + neutral second are graded strictly, hot legs are
  accepted in any order (follow the distro), and strike = hots (any order) → neutral → ground last.
  Keep the color code itself (black/red/blue = A/B/C) as reference, just not as a required sequence.
- inbox/local33-electric-guide-v3.html teaches "Green → White → Blue → Red → Black" as a fixed order —
  don't carry that over when merging its fixture browser into lighting/.

## Weekly sync checklist (when I say "sync the study guides")
1. git pull.
2. Process ./inbox/ (merge, don't clobber).
3. Update hub + README.
4. Show changes → commit → push → confirm the live site loads.

## ✅ Inbox contents (staged Oct 2026) — first sync plan — DONE Oct 2, 2026
All merged: backline 4a3c864 · rigging a4c7e6a · lighting 1acb956 · video a4d663e · av 4ecd836.
Don't re-merge these files if they're still sitting in ./inbox/.
- local33-backline-guide-v1.html → new backline/ guide (rebuild on the shared template)
- rigging-parts/ (3rd-ed parts 1–9 HTML + MASTER 3rd ed PDF) → new rigging/ guide
  4th-ed master app: public link https://claude.ai/public/artifacts/3301f079-fea7-4714-859e-d3bd0156bc20
  (now in inbox/rigging-parts/ along with the 3rd-ed master HTML; also saved as a file in the Study Hub project)
- local33-electric-guide-v3.html → merge ONLY its fixture browser + real-gear photos into lighting/
- terranea_video_refresher.html → fold into video/ (venue scenario)
- Qu-16 PDFs + source-manuals/ (Datavideo KAFL switcher) → source material for av/ and video/

## Finder tags (where else source files live)
- Blue tag = study-guide material. Blue + Red = Local 33-related study-guide material.
- Find them with: mdfind "kMDItemUserTags == 'Blue'"  — check these alongside ./inbox/ when syncing.
- As of Oct 3 2026 the tagged files were the two Qu-16 PDFs and the two Datavideo KAFL PDFs (all merged).

## Photo library (do NOT copy into the repo wholesale)
iCloud Drive › "Local 33 Docs:NFO" › "New 2 Add" — ~230 gear photos (HEIC) from Aug–Sep 2026 gigs.
When building guides: review, pick the useful ones, convert to compressed JPG/WebP, embed only what's needed.
