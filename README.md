# 佛我咖啡 / Forward Coffee

This repository publishes 佛我咖啡 / FORWARD COFFEE: a bilingual roasted-coffee storefront and the 好好手沖 workshop. The integrated version replaces the former course-only website on `main`, as requested by the user. See [deployment and rollback notes](docs/DEPLOYMENT-2026-10-22.md). See [course integration notes](docs/FORWARD-INTEGRATION.md) and the [five-coffee catalog guide](docs/FORWARD-CATALOG.md).

A bilingual, responsive roasted-coffee storefront and operable administration demo. Plain HTML, CSS and JavaScript; no build step, npm installation, backend or database is required.

- Live Chinese site: https://tsglee.github.io/coffee-beginner-course/?lang=zh
- Live English site: https://tsglee.github.io/coffee-beginner-course/?lang=en
- Repository: https://github.com/tsglee/coffee-beginner-course
- **For another AI agent: read [docs/AGENT-HANDOFF.md](docs/AGENT-HANDOFF.md) first.**

## Run locally

Unzip the handoff package and open a terminal in `encounter-coffee/`, the directory containing `index.html`:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/?lang=en or http://127.0.0.1:4173/?lang=zh. Stop the server with Ctrl+C. Use HTTP rather than double-clicking HTML files so all pages share a consistent browser storage origin.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Course-first hero and three distinct chapters: workshop, five sample coffees, delivery/support |
| `courses.html` | Complete 好好手沖 workshop, instructors, materials, FAQ and original LINE inquiry link |
| `contact.html` | LINE and email contact with a copyable inquiry draft; nothing is sent automatically |
| `policies.html` | Shipping, payment, returns, workshop booking and privacy information |
| `shop.html` | Five sample roasted coffees with origin/roast filters, English/Chinese search and sorting |
| `product.html?id=guji` | Six-image gallery, 250g/500g bags, stock, flavor, origin, roast date and duration |
| `checkout.html` | Shared demo cart, weight/price calculations and local demo orders |
| `admin-orders.html` | Products, stock, roast batches, orders, reports, settings and backup tools |
| `story.html`, `about.html` | Responsive brand story and contact information |

Append `?lang=en` to a page URL, or `&lang=en` when an existing product query is present. The EN / 繁中 switch keeps the product ID and anchor. Both languages use the same stored demo data.

## Validate

Node.js is needed only for tests (Node 18+ recommended):

```sh
node tests/store.test.cjs
node tests/i18n.test.cjs
node tests/course.test.cjs
```

There are 25 store/localization/course checks. Browser viewport validation is documented in [docs/ENGLISH-RWD.md](docs/ENGLISH-RWD.md).

## Package a committed snapshot

In a clean Git checkout, using Python 3.9+:

```sh
python3 scripts/package_site.py --release-date 2026-10-14
```

This creates one ZIP in the ignored `dist/` directory, containing the committed source, all tracked website assets, tests, instructions and a generated `RELEASE-MANIFEST.json` with the exact Git commit and per-file SHA-256 hashes. It excludes Git history and browser-saved data.

Verify a received archive with:

```sh
python3 scripts/package_site.py --verify /path/to/encounter-coffee-package.zip
```

See the handoff guide for GitHub Pages deployment, repository synchronization and how to continue development from an extracted source snapshot.

## Demo boundaries

Data is saved in this browser's `localStorage`. There is no real authentication, multi-user database, payment, shipping or email service. Prices, stock, roast dates, batches and customer/order records are sample data. Product/origin images are illustrative. Do not treat this as a production commerce backend.

The package contains the initial catalog, not edits made inside a user's browser. To transfer those edits too, export a JSON backup in Admin → Store & data settings and import it in the receiving browser. Google Fonts and official reference links require internet; local site assets and system-font fallbacks remain usable without it.
