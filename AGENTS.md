# Repository instructions

Read `README.md` and `docs/AGENT-HANDOFF.md` before changing this site. They describe the runtime, model invariants, localization, current demo scope and deployment.

Keep the brand 露露咖啡日記 / RURU COFFEE JOURNAL (supersedes the former Forward identity) and the bilingual navigation. Use the supplied `assets/ruru/official-logo.png` and `official-banner.png` for the current identity; preserve their original image content. Preserve the compatible storage keys, original option values, order price snapshots and transactional stock behavior. This is a localStorage demo, not a real authenticated commerce service.

For behavior or locale changes, run the relevant `tests/*.test.cjs` checks and verify affected pages in a browser. Maintain mobile layouts and relative paths under `/coffee-beginner-course/`. Bump HTML CSS/JS version suffixes when changing runtime assets.

Preserve existing user edits and avoid force-pushing/resetting shared branches. Use the user's current authorization for GitHub publication. A handoff ZIP must come from a clean committed snapshot, include the instructions and runtime assets, and pass `scripts/package_site.py --verify`.
