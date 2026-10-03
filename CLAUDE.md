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
- (to add) backline/, rigging/, carpentry/, sfx/
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
- Only two strict rules. Hook-up: GROUND (green) first, NEUTRAL (white) second, then the hot legs in
  whatever order they sit on the actual distro. Strike: hot legs first (any order), neutral, GROUND LAST.
- Never teach a fixed phase order (Black/Red/Blue or Blue/Red/Black) as a rule.

## FIRST FIX TASK
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

## Inbox contents (staged Oct 2026) — first sync plan
- local33-backline-guide-v1.html → new backline/ guide (rebuild on the shared template)
- rigging-parts/ (3rd-ed parts 1–9 HTML + MASTER 3rd ed PDF) → new rigging/ guide
  4th-ed master app: public link https://claude.ai/public/artifacts/3301f079-fea7-4714-859e-d3bd0156bc20
  (now in inbox/rigging-parts/ along with the 3rd-ed master HTML; also saved as a file in the Study Hub project)
- local33-electric-guide-v3.html → merge ONLY its fixture browser + real-gear photos into lighting/
- terranea_video_refresher.html → fold into video/ (venue scenario)
- Qu-16 PDFs + source-manuals/ (Datavideo KAFL switcher) → source material for av/ and video/

## Photo library (do NOT copy into the repo wholesale)
iCloud Drive › "Local 33 Docs:NFO" › "New 2 Add" — ~230 gear photos (HEIC) from Aug–Sep 2026 gigs.
When building guides: review, pick the useful ones, convert to compressed JPG/WebP, embed only what's needed.
