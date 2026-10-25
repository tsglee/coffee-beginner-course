# Homepage chapters — 2026-10-25

## User direction

The previous 50/50 homepage mixed course and sales content without clear boundaries. The latest instruction is to focus on teaching first, then explain that the business also sells coffee beans. This supersedes the earlier equal-panel homepage requirement.

## Current reading order

1. Workshop hero: one course photograph, beginner value proposition, four-hour duration, NT$1,800 fee, primary booking action, secondary jump to course details.
2. Numbered chapter navigation: workshop, coffee beans, delivery/support. Header shopping and booking links remain available.
3. Workshop chapter on the paper background: teaching photo, instructors, four factual details, booking link, three learning outcomes. All teaching content finishes before the sales chapter begins.
4. Coffee chapter on the contrasting stage background: own heading and introduction, three-image fade carousel, five sample bean cards, existing flavor filters/search and full-shop link.
5. Dark delivery/support chapter: confirmed shipping/payment terms, return-policy link and customer-contact link. The common footer follows.

Large section spacing, numbered headings, full-width background changes and dividing rules establish boundaries. Small screens follow exactly the same order. The Chinese slogan and 好好手沖 course name remain. New English copy is in the shared dictionary.

`assets/home-sections.css` is scoped to `.home-course-first` and new homepage components. It loads after `business.css`. `motion.js` adds the new headings/photos/details to progressive reveals. Existing motion pause and reduced-motion preferences apply to the course entrance and bean carousel. No commerce schema, prices, stock, checkout behavior or policy terms changed.

## Validation

- Existing 25 store/localization/course checks pass.
- Browser: home at 320, 390, 768 and 1440px in both languages. No horizontal overflow or completed broken images; primary course booking visible in the first screen in every checked size. English retains only the intentionally Chinese course name.
- Visual review of desktop and narrow mobile hero, course chapter and bean chapter.
- Manual carousel navigation, flavor filtering, mobile menu/Escape, theme selection, pause and homepage search checked. Booking/shop/support links checked.
- Responsive checks are viewport emulation, not physical-device testing.
