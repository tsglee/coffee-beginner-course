# Quiet, photograph-led homepage — 2026-10-26

This implements the user's six annotated homepage comments and their follow-up to continue. It supersedes the earlier banner-only hero. The official logo remains in every header/footer/admin; supplied originals remain unchanged.

## Visible changes

- Hero directly explains both services: learn pour-over, then buy class coffees for home practice. Both booking and shopping actions appear in the checked first viewports. Japanese editorial photography, warm paper and muted sage replace the large illustrated banner.
- The hero slowly crossfades between an illustrative brewing/bean still life and a real Lulu brewing photograph. A small, slow image drift accompanies the fade. Caption and previous/next controls expose the current photograph clearly.
- The teaching chapter leads with a real, front-facing photograph of both instructors found in the original course project. Most previous prose and the repeated three-step descriptions are removed from the homepage. The remaining facts are readable: workshop name, two teachers, four hours, NT$1,800, locations and beginner/private-session availability. Full curriculum remains on the course page.
- Coffee sales are positioned as the same class beans for home practice. The heading is now “本月熟豆選項,” with defective-bean sorting and monthly-menu wording requested by the user. The five existing products and sample-data disclosure remain. This is a business-content statement; it does not implement automatic monthly product rotation or imply health/medical benefits.
- Coffee, workshop and service sections use neighboring paper tones with fine dividing lines. The former blue sales block and dark service block are removed on the homepage. Distinct numbered sections and clear spacing remain.
- Delivery/support headings state the actual subjects: delivery, returns and contact, with the free-shipping threshold and dispatch condition stated directly. Policy terms, LINE and email are unchanged.

## Assets and provenance

- `assets/ruru/quiet-brewing.png`: new, built-in imagegen photograph for atmosphere; no identifiable instructor or product packaging is fabricated. Exact final prompt: `docs/quiet-hero-prompt.txt`.
- `assets/courses/teacher-duo.jpg`: supplied real `coffee_class_site/images/duo-hero-web.jpg`, copied byte-for-byte.
- `assets/courses/lulu-studio.jpg`: supplied real `coffee_class_site/images/lulu-studio-web.jpg`, copied byte-for-byte.
- File hashes are recorded in `docs/quiet-home-assets.json`. Original imported photos and their existing 12-file checksums are intact. CSS supplies the display crop and a gentle color treatment; original files are preserved.

## Motion and accessibility

`assets/quiet-home.js` controls the independent two-image hero. It crossfades every 7.5 seconds while in view and respects the existing `pure-select-motion` control. Automatic playback and image drift stop for reduced-motion preference, keyboard focus in the controls, control hover, hidden tabs and offscreen hero media. Previous/next remain usable with reduced motion. An unloaded image is not selected until ready. The old bean-photo carousel still uses its own controls and shared pause preference.

`assets/quiet-home.css` loads last and scopes the new design to `.quiet-home`. The four compatible theme IDs remain functional with subdued variants. Body copy is darker than the pale backgrounds for readability; low contrast is an art direction for photographs and surfaces, not an instruction to hide text.

## Validation

- 29 checks pass: 17 store, 5 localization, 4 course and 3 new hero-motion checks. The motion checks cover manual wrapping/ARIA, focus/hover/visibility/offscreen/pause behavior, reduced motion and image loading.
- Browser: Chinese and English at 320×740, 390×844, 768×900, 1211×900 and 1440×900. No horizontal document overflow or completed broken images. Both hero actions fit the first screen. The intentionally Chinese course name remains in English.
- Visual inspection of the hero, real duo photograph, class-coffee layout and neighboring section backgrounds. Manual hero auto-advance/pause, controls, existing flavor filter/search, mobile menu, primary links and four theme variants checked.
- The browser UI does not expose an OS reduced-motion emulation control; that branch is covered by the controller tests and CSS rules. Do not claim physical-device or OS-preference testing.
- No changes to product data, pricing, stock, order schema, checkout or course contents. Responsive checks use viewport emulation.

## Catalog follow-up

The user flagged the blue catalog introduction and demo notice as visually disconnected. `assets/ruru.css` now scopes the same quiet homepage palette to `body[data-page=catalog]`, including the four existing theme variants. The shop uses warm paper and pale sage surfaces with matching readable text, borders and controls. Product data, photographs and layout are unchanged. `shop.html` uses the `20261026-shop1` stylesheet version to refresh cached catalog styles.
