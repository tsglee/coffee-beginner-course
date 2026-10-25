# Agent handoff: 露露咖啡日記 / Ruru Coffee Journal

This document is the starting point for another AI agent receiving the ZIP. It describes the current implementation, not a proposal. Package provenance and exact file hashes are in the ZIP's root `RELEASE-MANIFEST.json`; a regular Git clone has no generated manifest until a package is built.

## Branch update: forward (2026-10-22)

The integration was developed on `tsglee/coffee-site` branch `forward` at `74cdd4118c5d15801b45f48ce88e148c312a482d`. The user then explicitly requested replacing the course repository with this version. This repository, `tsglee/coffee-beginner-course`, now publishes the integrated site from `main` at https://tsglee.github.io/coffee-beginner-course/. The latest homepage leads with teaching, then introduces coffee sales in a separate chapter, followed by delivery/support. This follows the user’s latest direction and supersedes the earlier 50/50 hero. See `docs/DEPLOYMENT-2026-10-22.md` for the old release backup, compatibility redirect and rollback. The separate `coffee-site` repository was not merged into its own main.

## 1. Scope and design

The user asked for a distinctive photographic coffee brand site, inspired by the full-screen, slowly fading images on Encounter Coffee's reference site. The implementation is original project code and illustrative images; it is not a copy of that site's source or its merchant backend.

The brand is **露露咖啡日記**, with **Ruru Coffee Journal** in English. The user separated this site from 佛我咖啡 / Forward Coffee on 2026-10-26; do not restore that former identity. The visual identity follows the user’s commemorative bag reference: ivory, mist blue, peach, sage, a serif Ruru wordmark and a sleeping cat. See `docs/RURU-BRAND-2026-10-26.md`. The workshop name stays **好好手沖** in both locales by user request; do not translate the course name. Do not restore the previous 四選淨豆 / Pure Select branding. The old `pure-select-*` storage keys remain intentionally compatible with existing browsers. The store model maps the previous default shop name to the current default without discarding orders or inventory; custom shop names are preserved.

Implemented features:

- Three full-screen hero photos: coffee beans, roastery and morning brewing. Default six-second fading carousel, manual controls, motion pause, hidden-tab handling and reduced-motion support.
- Four homepage palettes: `terra`, `forest`, `cobalt`, `nocturne`.
- Five **sample roasted** coffee products: Huehuetenango, Yirgacheffe, Guji, Brazil Cerrado and Mandheling. Each has six distinct gallery entries, origin imagery, flavor notes, roast metadata and independent 250g/500g SKUs. Some generic bean/packaging/brewing images are shared between products.
- Functional local cart and order creation, with transactional stock changes and order snapshots.
- Operable demo admin: overview, product CRUD/visibility/images, stock adjustments, roast schedules/completion, order workflow, reports, settings and CSV/JSON export/import/reset.
- Chinese and English storefronts and admin UI, with responsive layouts and language-preserving navigation.

The user explicitly chose a **complete operable demo**, not real login/database/multi-user management. Do not imply that payments, shipping, authentication or shared server data exist.

## 2. Runtime and dependencies

Serve the folder containing `index.html`:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

No framework, bundler, npm dependencies or environment secrets are required. Python is only a convenient HTTP server and package builder. Node is only needed for tests. Modern browsers need JavaScript and writable localStorage; image upload uses `createImageBitmap` and canvas to resize JPEG/PNG/WebP images in the browser.

All runtime images are local under `assets/`, including the generated JPEG assets. Google Fonts are externally linked; if unavailable the CSS falls back to installed fonts. Official price references open external websites. Running the demo does not require access to the original author machine.

## 3. Source map

| Path | Responsibility |
| --- | --- |
| Ten root HTML files | Page shells, static homepage/editorial content and ordered script/style loading |
| `assets/catalog-data.js` | `window.COFFEE_SEED`: initial products, batches, orders, cart, ledger and settings |
| `assets/store.js` | `window.CoffeeStore`: validation, transactions, local persistence and state-change events |
| `assets/commerce.js` | Storefront rendering, filters, product galleries, quantity/weight calculations and checkout |
| `assets/admin.js` | Admin routes, forms/modals, inventory, batches, order workflow, reports, backup and image upload |
| `assets/home.js` | Homepage menus, themes, photo carousel, motion controls, featured filters/search and selection steps |
| `assets/en-dictionary.js` | English copy keyed by original Chinese text |
| `assets/i18n.js` | Language selection, text/attribute translation, dynamic content observer and internal link localization |
| `assets/home.css` | Shared palette tokens and original homepage design |
| `assets/ruru.css`, `assets/brand-theme.js`, `assets/ruru/` | Current shared Ruru identity, compatible theme preference, vector wordmark/favicon and brand illustration |
| `assets/home-sections.css` | Scoped course-first homepage, numbered chapters and distinct section backgrounds |
| `assets/business.css`, `assets/business.js` | Shared customer support/footer styling and copyable inquiry drafts |
| `assets/premium.css`, `assets/motion.js` | Shared editorial styling, unified course invitations, progressive reveal and reduced-motion handling |
| `assets/commerce.css` | Storefront/admin components and base responsive layouts |
| `assets/responsive.css` | English typography, language switch, editorial layouts and mobile corrections |
| `assets/catalog/` | Twelve added origin/bean/packaging/hero JPEG illustrations |
| `tests/store.test.cjs` | Seventeen data/transaction/compatibility checks using a mocked localStorage |
| `tests/i18n.test.cjs` | Five localization/link/data-integrity checks |
| `scripts/package_site.py` | Reproducible committed-source ZIP and hash-manifest creation/verification |

Keep locale setup before page renderers. When changing CSS or JavaScript, bump the `v=` query suffix in the HTML asset URLs to avoid clients mixing old and new assets. Existing suffixes are version labels, not a build pipeline.

## 4. URLs and language behavior

- Chinese homepage: `/?lang=zh`; English homepage: `/?lang=en`.
- Product: `/product.html?id=mandheling&lang=en`.
- Product brew section: `/product.html?id=guji&lang=en#brew-guide`.
- Admin routes: `#overview`, `#products`, `#inventory`, `#roasting`, `#orders`, `#reports`, `#settings`.
- Order deep link: `/admin-orders.html?order=ORDER_ID&lang=en#orders`.

Actual URLs have the repository subpath `/coffee-beginner-course/` on GitHub Pages. Use relative site links; do not assume deployment at a domain root.

The locale comes from `lang=en`; absent or other values select Traditional Chinese. The switch keeps other query parameters and the hash, but reloads the document. Locale views share the same browser storage. Currency remains NT$ and weight remains grams in English.

Localization translates visible strings, titles, descriptions, accessibility labels, image alt text and supported dynamic messages. Option labels may be translated but their **values stay original** so filters and forms still match the model. English storefront/admin search includes translated catalog text.

The five current sample products and historical catalog have English display translations. Admin edits the **original shared content**, with an explanatory note. A new user-entered Chinese sentence is not automatically machine-translated; add appropriate dictionary entries, or implement explicit bilingual fields if the future scope requires independent translations. JSON backups retain raw state; English CSV exports translate known labels/content. Do not translate SKU IDs, record IDs, enum values, backup JSON or user-entered form data in place.

## 5. Data model and invariants

Main storage key: `pure-select-store-v1`. Other keys include `pure-select-theme` and `pure-select-motion`. Origins are independent across domains and ports. GitHub Pages projects under the same tsglee.github.io origin share localStorage even when their repository paths differ.

`CoffeeStore.state()` returns a copy of state. Mutations read the latest saved state, clone, validate and commit. A failed persistence write must not partially apply an order or inventory update. Notifications use `coffee:change` plus cross-tab `storage` events. This does not provide server-side, multi-user transaction guarantees.

Public model API includes:

```text
state, validate, today, imageURL
cartDetails, addCart, setCart, createOrder, updateOrder
saveProduct, deleteProduct, adjustStock
addBatch, updateBatch, saveSettings
exportData, importData, reset
statuses, payments
```

Important rules:

1. Each product has two variants with grams exactly 250 and 500, SKU `${productId}-${grams}`, integer prices and integer stock in **bags**. UI shows both bag counts and total grams. Editing product content must not overwrite stock.
2. Product galleries require 5–12 entries and at least five distinct image URLs. Image URLs are validated as local asset paths, HTTPS or supported image data URLs. Keep escaped text rendering and image validation when adding UI.
3. Cart lines do not reserve stock. Creating an order checks current availability and prices, deducts stock, records snapshots and clears the cart atomically. Historical order prices do not change when product prices change.
4. Fulfillment progresses `new → confirmed → packing → shipped → completed`. Shipping requires a tracking number. Cancellation before shipping restores stock once; shipped/completed orders need a separate future returns implementation.
5. Cancelling a paid order records `refund_pending`, then may be marked `refunded`. These are local status records, not money movements. Other payment enums are `unpaid` and `paid`.
6. Batches progress `planned → roasting → completed`; completion adds each bag size's quantity only once and updates the product's latest batch. A future scheduled date cannot be completed early.
7. Inventory is aggregated by SKU. Displaying the latest completed batch does **not** provide FIFO or per-bag lot traceability.
8. Products with order history cannot be deleted. Hide them instead. Stock changes require a reason and produce ledger entries.
9. JSON imports validate duplicate IDs/SKUs, numeric types, totals, timestamps, images and record associations before replacing saved data.
10. Dates used by the model are in `Asia/Taipei`. Seed dates and durations are deliberately fictional demo values, not current inventory promises.

## 6. Content and asset provenance

The current catalog contains five replaceable samples, led by Guatemala Huehuetenango. See `docs/FORWARD-CATALOG.md` for prices, IDs, editing guidance and saved-data migration. The original ten-coffee research remains a historical reference, not a specification or supplier quote for the current catalog.

- `docs/coffee-price-survey-2026-10-13.md`: official source links, original weights/prices, researched flavor/variety information and unknowns. The site's own 250g/500g prices are separate **demo prices**, not supplier quotes or direct normalized comparisons.
- `docs/catalog-images.md`: added image index and website paths.
- `docs/catalog-image-prompts-a.md`, `docs/catalog-image-prompts-b.md`, `assets/coffee-roast-hero.prompt.md`: historical built-in imagegen prompts.

Images are illustrations, not verified photos of a specific farm, package or batch. Historical generation logs mention absolute paths to original PNGs on the author's machine; these are provenance notes, not runtime dependencies. The package includes the committed website JPEGs, not those external original PNG files. No specific third-party asset license is asserted by this handoff; review rights if repurposing outside the user's project.

The shop email is existing demo contact copy, not a configured mail integration. About/story pages use the same responsive visual language; older unconnected membership/contact-form placeholders were removed.

## 7. Verification workflow

Run from the project root:

```sh
node tests/store.test.cjs
node tests/i18n.test.cjs
node tests/course.test.cjs
```

Expected on this release: 17 store checks, 5 localization checks and 4 course-integration checks pass. They cover valid seed/gallery/SKUs, live-price order snapshots, overselling, cancellation, shipping/tracking, batch idempotency, storage rollback, import validation, historical product deletion, old-brand migration, English product copy, link/query/hash preservation and raw-data integrity.

Also check JavaScript syntax with `node --check` for changed files, local asset/link references and `git diff --check`. Use a real browser for interactions and visual verification. Previous viewport checks: 320×740, 390×844, 768×1024, 1280×900, and an 844×390 landscape homepage. Ten English product pages have been checked at 320px; the long Mandheling origin/altitude field exposed an overflow and was fixed using shrinkable grid columns.

Suggested manual regression:

1. Both languages: hero auto/manual controls, pause, menu, palette and featured search/filter.
2. English catalog: search `mango`, filter Guatemala, sort by price and roast date.
3. Product: all gallery controls/lightbox, 250g/500g price and stock, bag-count × weight.
4. Switch languages on a product link; preserve ID/hash and cart data.
5. Demo checkout and admin cancellation; verify stock is deducted/restored once.
6. Complete a roast batch once; verify stock and latest date/duration update.
7. Mobile product/batch modals, editable image rows, order forms, overflow-contained admin tables and 16px form fonts.
8. Backup preview/paste import and CSV headers. Use fictional customer data for demos.

Known verification limits: responsive checks used browser viewport emulation, not physical iPhone/Android devices. CSV/JSON content, previews, copy fallback and paste import were checked; the built-in browser did not return a completed native download event during earlier export testing. Do not describe native admin file downloads as fully verified. The release ZIP is independently checksum-verified.

## 8. Git and deployment

Repository: `https://github.com/tsglee/coffee-beginner-course.git`. Canonical deployed branch: **main**. GitHub Pages uses the branch root with legacy Pages builds; `.nojekyll` is included. There is no custom Actions workflow or build step.

The user requested completed versions be committed/pushed and shared as public links. Keep local `main`, `origin/main` and the remote main commit aligned when delivering a release. Avoid forced resets/pushes and preserve any user's working changes. Before continuing:

```sh
git status --short --branch
git fetch origin
git switch main
git pull --ff-only origin main
```

Work on a `codex/` branch when appropriate, validate, commit and push. After authorized deployment to main, confirm the Pages build belongs to the new main commit and inspect the live site, rather than only checking a local preview.

For an extracted ZIP, **there is no `.git` directory or history**. To continue in the existing repository, clone it normally and use the manifest's `git.commit` to identify the snapshot:

```sh
git clone https://github.com/tsglee/coffee-beginner-course.git
cd coffee-beginner-course
git show SNAPSHOT_COMMIT
```

For an independent project, the extracted files can be placed in a new repository. Do not attach a newly initialized, unrelated history to the existing repository and force-push it. Files can also be hosted directly on a static host; preserve relative asset paths and serve over HTTP/HTTPS.

## 9. What the ZIP includes and omits

Included: every tracked file at the packaged Git commit, all runtime images, both languages, the full admin demo, tests, source/provenance docs, this guide, the package script and a generated release manifest. The manifest records the commit, tree, branch, public/repository URLs, release date and SHA-256/size of each included source file.

Omitted: Git history, local ignored/untracked files, server processes, browser localStorage, external original generated PNGs, credentials and a production backend. To transfer browser changes, use the admin's JSON export/import separately; the source ZIP starts with the committed seed catalog. It does not silently extract user/browser data.

To rebuild a package from a clean Git checkout, run the command in README. To verify any received ZIP, run the package script's `--verify` mode, which needs Python only and does not require a Git checkout.

## 2026-10-25: Equal services and buyer support

See `docs/DUAL-BUSINESS-2026-10-25.md` for the current 50/50 homepage, confirmed pickup/COD terms, returns sources, inquiry workflow and settings migration. This supersedes the earlier bean-first design.

## 2026-10-25: Course-first chapter layout

The user found the equal-service composition confusing and requested teaching first, coffee sales second. The current homepage has one workshop hero, a chapter navigation strip, a complete course chapter, a separate coffee chapter with the existing carousel/catalog controls, and a dark delivery/support chapter. See `docs/HOME-CHAPTERS-2026-10-25.md`. This supersedes the 50/50 visual priority while preserving both businesses.

## 2026-10-26: Ruru identity

All storefront pages and the demo admin now use 露露咖啡日記 / Ruru Coffee Journal. Workshop contents, product data, shipping/returns, links and course-first chapter order are unchanged. Existing known default shop names migrate to Ruru on read/import; custom names and all commerce records remain intact. The four existing theme IDs are retained with new brand palettes. `assets/ruru.css` must load after all other CSS. `assets/brand-theme.js` applies the saved preference across pages. The logo is a web reconstruction of the supplied reference’s serif wordmark, not an original vector file supplied by the user. The new cat illustration is decorative artwork, not a photograph of a product or course. Legacy internal batch IDs are intentionally retained.
