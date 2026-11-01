# Five design variations and larger type — 2026-11-01

The latest integrated Ruru site is retained; this change does not restore the historical course-only website.

| Version | Composition | Palette |
| --- | --- | --- |
| A / 霧藍留白 | Full-width pour-over photograph, left-aligned copy and broad whitespace | Sky blue, white, deep blue |
| B / 奶油咖啡誌 | Photograph on the left, editorial typography on the right, reversed teacher chapter | Cream, botanical green |
| C / 陶土日光 | Arch-shaped photograph, rounded calls to action, warm framed teacher composition | Terracotta, oat, peach |
| D / 靜夜精品 | Cinematic photograph, brass highlights and wide chapter spreads | Deep teal, ivory, brass |
| E / 鈷藍海報 | Large typographic opening, panoramic photo, graphic teacher block | Cobalt, apricot, off-white |

Each version includes workshop information, authentic instructors, the existing five sample products, flavor filtering/search, service information and direct LINE actions. The current quiet homepage also receives the shared font-size and inquiry changes. Five alternative compositions are available from `designs.html`; none silently replaces the current homepage selection.

## Typography

Desktop main prose is 19px; phone prose is 18px. Navigation and actions are generally 17px. Metadata is 15–16px rather than the previous 10–13px. Main headings scale by viewport. Controls have a 48px minimum touch height. Text appears immediately rather than awaiting a reveal animation. The existing photo carousel and motion preference remain available on the current homepage.

## LINE funnel

The existing OA is `https://lin.ee/5bkhZu1`. Hero, workshop preview, final dual inquiry section, product cards and product-detail purchase action lead to that destination. Product images and editorial links still open details. The product form keeps weight and bag-count exploration but no longer adds to the demo cart. Availability, amounts, shipping and dates are confirmed through LINE. No message is sent automatically.

The store/admin implementation and existing storage schema are retained. Tests still cover price snapshots, stock, cancellation, persistence rollback and localization. No new product availability or real inventory is claimed.

## Assets

The official supplied Logo and all authentic instructor photographs are unchanged. Design photography reuses the existing generated coffee scenes from the earlier design study, copied byte-for-byte into `assets/designs/`: sky → hero-sky; sage and clay → hero-sage; noir → hero-stitch; cobalt → hero-bold. Preview JPEGs are actual browser screenshots of the implemented pages.

## Verification

- All 29 existing store/localization/course/photo-controller tests pass.
- Two new checks cover dynamic card LINE destinations and both inquiry actions in each design.
- Static reference checks pass for all root pages, images/styles/scripts, static anchors, IDs and link attributes.
- Five variants: 320px, 768px, 1440px, and English at 390px. Current homepage, shop, product, course and contact pages: 320px, 390px, 768px, 1440px plus English at 390px. No document overflow was observed; completed images loaded.
- Manual mobile menu/Escape, flavor filter, language switch, 500g selection, bag-count calculation, product gallery, course FAQ and palette/query propagation pass.
- Browser viewport emulation was used; physical devices and OS preference settings were not changed.
