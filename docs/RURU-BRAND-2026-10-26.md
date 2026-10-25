# 露露咖啡日記 / Ruru Coffee Journal

The user separated this site from 佛我咖啡 / Forward Coffee on 2026-10-26. All current storefront pages, page titles, bilingual copy, course data and the demo administration now use **露露咖啡日記 / Ruru Coffee Journal**. Historical integration documents and immutable batch identifiers may still contain the former name; these are not instructions to restore that identity.

## Design reference and current assets

The user supplied a commemorative coffee-bag design showing a serif Ruru wordmark, ivory paper, mist-blue hills, a peach sun, sage leaves and a sleeping gray-and-white cat. The site carries those visual cues into a light, editorial layout while preserving the course-first chapter order.

- Main palette: ivory `#f6efe6`, ink blue `#213c47`, mist blue `#82a9bb`, peach `#eebda9`, sage `#8e9f89`. Interactive blue is darker for readable labels.
- `assets/ruru/wordmark.svg`: a scalable web reconstruction of the reference's serif Ruru / coffee journal lettering, using Georgia/Times system fonts. This is not an original vector logo file supplied by the user. The Chinese brand signature is visible below it in both locales.
- `assets/ruru/favicon.svg`: original small R mark, sun and blue hills, built as simple vector shapes.
- `assets/ruru/daylight-cat.png`: new decorative artwork generated with the built-in imagegen tool, using the supplied bag image as a style/character reference. It is a brand illustration, not an actual product, classroom photograph or item included with the course.
- The exact final generation prompt is saved in `docs/ruru-illustration-prompt.txt`. No CLI or external API key was used. The selected generated PNG is committed in the project and has no dependency on the author's generated-images folder.
- `assets/ruru.css`: shared palette, logo, light homepage, blue sales chapter, blue support chapter, course/support/admin styling and mobile corrections. Load after all previous stylesheets.
- `assets/brand-theme.js`: applies the existing saved palette preference before rendering on all full pages.

The existing four theme IDs (`terra`, `forest`, `cobalt`, `nocturne`) remain compatible, now labeled 霧藍日記 / 鼠尾草綠 / 蜜桃晨光 / 靜夜藍. Do not reuse the old brown/green/purple visual defaults on this site. All four new options remain within the Ruru visual language.

## What stays the same

Workshop name 好好手沖, curriculum, teachers, duration, fee, locations, LINE destination and learning materials remain unchanged. The five sample beans, IDs, SKUs, prices, stock, galleries and order/batch associations remain unchanged. Shipping, payment and returns policies remain unchanged. Course-first reading order remains: workshop → coffee beans → delivery/support.

Known previous default shop names migrate to the new default on read/import. Reading alone does not write storage. The migration preserves custom shop names and all products, orders, cart lines, stock, batches and ledger entries. Existing storage keys, theme IDs and immutable identifiers remain compatible; no browser reset is required. This remains a local demo, not a new backend.

## Verification

- 17 store checks, 5 localization checks and 4 course checks pass (26 total), including saved/imported former-brand migration, custom-name preservation and unchanged commerce records.
- Eighty browser combinations: ten full pages, Chinese/English, widths 320, 390, 768 and 1440. No document-level horizontal overflow, completed broken images or former branding in page titles/body prose. The Chinese brand signature and 好好手沖 name intentionally remain in English views.
- Visual inspection includes the home hero, mobile logo/booking/illustration spacing, course booking captions and button contrast, store and administration.
- Existing homepage carousel, filters/search, four palettes, motion controls, course menu/booking and product/cart behavior checked.
- Responsive validation uses viewport emulation rather than physical devices.

The transferable ZIP filename now starts `ruru-coffee-journal-`; the internal `encounter-coffee/` folder is retained for package-verifier compatibility. Its manifest identifies Ruru and the exact current commit. That legacy archive folder name is not a public brand label.
