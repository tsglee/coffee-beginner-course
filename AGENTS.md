# Repository instructions

Read README.md, PRODUCT.md and the latest section of docs/AGENT-HANDOFF.md before editing. The confirmed Warm Workshop version replaced the former public homepage on 2026-11-06 under explicit user publication authorization.

The active public pages are index.html (complete 好好手沖 beginner workshop) and beans.html (current coffee catalog). Preserve 露露咖啡日記 / Ruru Coffee Journal and the original official Logo. The user removed English version navigation; do not restore it. Keep real instructor/classroom photos authentic and sales imagery photographic, clearly distinguishing stock/reference imagery from actual Ruru batches. Keep image author/license records.

All course and purchase inquiries go to https://lin.ee/5bkhZu1. Current course: NT$1,800/person,4hours,Linkou only,atleast3coffees,SOPprocesshandout,100gclassbeans to take home. Do not restore separate learning cards, old locations, gifts of equipment or unconfirmed booking promises. Update products through data/coffees.json; every catalog contains3–5products. See UPDATE-COFFEES.md. Run python3 build.py, python3 check.py and relevant catalog variant checks for data/renderer changes. Bump HTML asset version suffixes for CSS/JS changes. Preserve relative paths under /coffee-beginner-course/ and verify affected pages in a browser.

Historical store/admin scripts and storage keys remain for compatibility. Preserve original option values, order price snapshots and transactional stock behavior when editing those retained modules. They are localStorage demos, not real authenticated commerce. Existing Node tests cover that legacy runtime and must stay meaningful; historical demo offers are not the current catalog. Public courses/shop/product legacy URLs redirect to the current course or bean page.

Preserve user edits. No forced resets or force pushes. Follow current user authorization for Git publication, not historical local-only notes. A requested handoff ZIP must come from a clean committed snapshot and pass scripts/package_site.py --verify.
