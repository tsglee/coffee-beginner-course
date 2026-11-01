# Signature proposal QA

Target: `design-signature.html`, additive to current official index.

## Verification
- Existing 31 Node store, i18n, course, quiet-home and LINE inquiry checks passed.
- Static HTML asset/page/anchor/LINE validator and JavaScript syntax checks passed.
- Browser viewport checks at 320×740, 390×844, 768×1024, 1280×900 and 1440×1000: no horizontal document overflow, hero loaded, five catalog rows and correct direct LINE URLs.
- Native flavor buttons selected Guatemala for sweet and Brazil for cocoa; menu selected Guji. Mobile menu opened, closed on Escape and closed after anchor navigation.
- English switch preserved route and rendered translated heading, actions, facts and image alt. Final English phone spacing correction visually recaptured. Both phone LINE controls are 48px tall with no overflow.
- Teacher photo uses natural height and landscape framing to keep both faces visible.
- Reduced-motion CSS removes animation and smooth scroll. Native controls provide keyboard semantics and visible focus styles.

## Review artifacts and limits
Latest viewport/fullpage screenshots are saved in the development workspace `qa/signature-2026-11-01/` and ignored local `.impeccable/review/`. Fullpage capture may show an offscreen fixed skip link at the current scroll position: normal viewport captures and computed CSS confirm it remains at -100px unless focused. Physical phones and screen readers were not tested.

The single detector pass reported an inactive-control contrast issue and 9px mobile English brand text; these were fixed to .8 opacity and 11px. Its cream-palette warning is a deliberate choice from the supplied blue/cream Logo. The independent finish review requested integrating the course name into its heading and separating text around hidden mobile line breaks; both were corrected and recaptured. Final verdict is recorded with the handoff.

## Independent review verdict
Initial disposition: fix. Follow-up disposition: ship for the two scored fixes; updated fullpage and English phone captures showed both resolved, with no regressions identified in that batch. This is not a claim of a universal design score or comp fidelity.
