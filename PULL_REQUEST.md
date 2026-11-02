# Highway — Seamless Night-Drive Screen Saver

**Head:** `highway-screensaver`  →  **Base:** `New-Features`

## What's in this PR
- New screen saver **Highway**: rear chase-cam of a black sedan on a dead-straight, unlit night highway. No neon, no street lamps — only moonlight rim highlights, crescent moon, starfield, the car's own headlight cone on asphalt, red taillight bloom, reflective cat's-eye delineator posts (white left / red right), guardrails, scrolling treeline silhouettes, perspective road dashes, subtle suspension roll/sway/bob, motion-blurred wheels.
- **Seamless infinite loop:** one master phase clock with a 12-second period; every scroll frequency is an integer multiple of 1/period, so first and last frames are pixel-identical (verified: 0 differing draw ops after 1/2/5 full loops).
- Category **"Ocean Exploration" renamed to "Exploration"**; Highway placed under it (now: Under the Ocean, Highway). Cinematic Worlds keeps Spider-Man, Batman, Interstellar.

## Changed files
- `script.js` (+586 / −3): registry entry moved/renamed + new `createHighway()` engine (#33).

## Verification
- `node --check script.js` OK; `vite build` succeeds.
- Headless dashboard-render test: sections show Classic → Cinematic Worlds → **Exploration (Under the Ocean, Highway)** → …; no stale "Ocean Exploration" references.
- Seam-diff harness: frame at P=0 vs. after exactly N full loops → identical draw operations.

## If you still see nothing in the UI
The dev environment has file-watching/HMR disabled, so the browser may hold a cached copy of `/script.js`. After merging, hard-refresh once (Ctrl+Shift+R / Cmd+Shift+R) or restart the dev server so it re-reads from disk.
