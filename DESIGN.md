---
name: Ruru Coffee Journal — Warm Workshop
description: A warm, readable local coffee-workshop prototype with real people and original illustrations.
colors:
  paper: "#fffdf6"
  sky: "#dceef5"
  blue: "#28536a"
  ink: "#443a34"
  muted: "#6a6059"
  line: "#d8d4c8"
  honey: "#f5e3a8"
  peach: "#f4dfce"
  sage: "#e9efe4"
  rose: "#f4e7df"
typography:
  display:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "61px"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "45px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.85
  body-phone:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Huninn, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  tag: "6px"
  compact: "8px"
  button: "10px"
  photo: "14px"
  panel: "16px"
  hero: "24px"
spacing:
  inline-small: "12px"
  inline: "24px"
  gutter: "32px"
  panel: "48px"
  section-phone: "60px"
  section-tablet: "70px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "#1d4256"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "14px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.sky}"
  text-link:
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    padding: "8px 0"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "7px 0"
  flavor-tag:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "4px 13px"
  course-facts:
    backgroundColor: "{colors.peach}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "30px 34px"
  parameter-control:
    textColor: "#456171"
    padding: "16px 4px 18px"
  faq-summary:
    textColor: "{colors.ink}"
    padding: "22px 0"
---

# Design System: Ruru Coffee Journal — Warm Workshop

## Overview

**Creative North Star: "A home-practice invitation"**

A warm, simple coffee workshop world: rounded readable lettering, cream paper, Logo-derived sky blue and cocoa ink. Open information rows and generous breathing room make a substantial beginner course approachable. Genuine classroom and instructor photographs sit alongside restrained observational pencil sketches of brewing, home practice and tasting notes, without anthropomorphic faces. Bean-sales introductions and product rows use genuine sourced coffee, regional/context and fruit photography, with visible reference-photo disclosures and licensed attribution; no AI product pictures.

This documents the confirmed Warm Workshop implementation now used for the published Chinese homepage and current-coffee page. It is extracted from `assets/style.css`, `assets/site.js`, `index.html` and `beans.html`, with `PRODUCT.md` and `design/direction.md` supplying confirmed identity context. The build is code-led; there is no approved visual comp. It supersedes the former signature-proposal system for the active public pages. Historical signature documentation is preserved under docs/archive/.

**Key Characteristics:**
- Warm paper and light blue, with dark readable type.
- One locally hosted rounded typeface across Chinese and English.
- Real people and original illustrative coffee companions.
- Open rows, quiet dividers and selective colored panels.
- Native controls, visible focus and modest motion.

## Colors

Pastel surfaces carry warmth; dark blue and cocoa carry reading and action. Frontmatter records the reused implementation colors, not every local tint.

### Primary
- **Deep workshop blue:** primary actions, linked headings, navigation states and focus outlines.
- **Light sky:** the hero, lesson panel, teacher section and course bridge.

### Secondary
- **Honey:** the bean invitation and selected-text highlight.
- **Peach:** practical course facts.
- **Sage:** the learning section and one bean's flavor tags.
- **Rose:** the default bean flavor tags.

### Neutral
- **Paper:** page background, outlined buttons and light text on primary actions.
- **Cocoa ink:** primary reading text.
- **Warm muted ink:** supporting paragraphs and captions.
- **Soft divider:** open-list and section boundaries.

**The Reading Ink Rule.** Use cocoa or deep blue for readable content on pastel surfaces; pale fills organize the page rather than replacing dark text.

The sidecar's eight-step tonal ramps are derived preview extensions only. They are not CSS scales or authorization to substitute new colors into this build. Unused root declarations are omitted.

## Typography

**Display and Body Font:** locally hosted Huninn Regular (`assets/Huninn-Regular.ttf`), with PingFang TC, Microsoft JhengHei and sans-serif fallbacks. Headings inherit the actual body stack; the separately declared display variable is not assigned in the current stylesheet.

Rounded strokes, regular weight and generous leading make the long beginner explanation feel conversational. This is an observed hierarchy with responsive and component overrides, not a mathematical scale.

- **Display:** course hero baseline from the frontmatter; its blue phrase is smaller (55px). Bean hero uses a separate larger treatment (66px, 1.4).
- **Headline:** baseline h2 from the frontmatter; built sections vary approximately 35–45px on desktop and 32–36px on phones.
- **Title:** baseline h3; audience and lesson rows commonly use 24–28px.
- **Body:** desktop value from the frontmatter, switching to the phone value at 600px and below; paragraphs cap at 70ch.
- **Label:** primary action text; navigation is 17px on desktop and 18px inside the expanded mobile menu.
- **Caption:** default supporting text; local fine print ranges from 13–17px and is not a second body-size standard.

**The Comfortable Reading Rule.** Preserve the actual 19px desktop and 18px phone body sizes with 1.85 leading; captions remain a distinct supporting role.

## Layout

The shared content shell caps at 1280px including 32px side padding; header and hero cap at 1440px. Sections normally use 100px vertical padding. The stylesheet uses contextual gaps and padding, not a strict spacing multiplier.

Desktop compositions combine two columns, open learning rows, a four-column lesson sequence and alternating bean image/text rows. At 1040px and below, the main menu becomes a disclosure, section introductions stack, the parameter lesson becomes one column and the lesson sequence becomes two columns. At 760px, shell padding becomes 24px and section spacing 70px; several content pairs stack. At 600px, body copy becomes 18px, section spacing 60px, remaining principal pairs and the lesson sequence stack, and bean image/text order resets to natural reading order. Below 360px, shell padding becomes 20px. Above 1500px, the hero receives larger side padding and a taller photograph.

The current course hero specifically reorders at 760px and below: title, beginner introduction, price/duration, take-home promise, photo plus illustration, explanatory paragraph, inline actions. At 600px its outer blue surface becomes full width with square outside corners. Final phone course display is 42px with a 34px blue phrase; below 360px it is 39px/31px. English has separate measured overrides, including 37px/31px on phones. These are surface-specific arrangements, not requirements for every future page.

The sticky header reserves scroll offsets (112px; 90px below 761px). At 600px and below, two fixed bottom actions use 52px minimum height, safe-area padding and matching body clearance. Course and bean inquiries lead to the existing LINE URL; the secondary action connects the two pages.

## Elevation & Depth

The implementation has no box shadows. Broad pale surfaces, quiet borders, photo/illustration overlap and slight image rotation create depth. Most reading lists remain on the page background; a few instructional or practical blocks receive colored rounded containers. No elevation scale is invented.

Buttons transition over 0.2s; the primary hover moves upward 2px and darkens. Link arrows move 4px. Parameter copy unfolds over 0.26s with a 5px movement. Reduced-motion mode removes animations and transitions and disables smooth scrolling.

## Shapes

Soft rectangular corners distinguish roles: small flavor tags, compact fixed actions, primary buttons, photos, learning panels and the broad hero use the extracted radius tokens. Numbered steps use circles. Thin borders organize rows and keyboard focus uses a blue outline (3px, offset 5px). The hero's illustration has a cream picture frame and a small rotation; these are image treatments rather than shadow styles.

## Components

### Buttons and text links

Primary and secondary actions share a blue border, regular 18px label, 58px minimum height, 28px internal gap and the frontmatter shape/padding. Primary uses blue/paper; secondary uses paper/blue and becomes sky on hover. Focus uses the common outline. Text links use an underline border and 48px minimum height; their inline SVG arrow moves on hover. Relevant actions stretch to full width on phones.

### Navigation

The original blue/cream Logo remains intact. The desktop nav is a simple horizontal row with a blue underline for hover/current state, plus a language link and LINE link. Below 1041px a 46px menu button reveals stacked links; selection or Escape closes it, and Escape returns focus to the button. The header LINE label hides below 601px while the fixed action bar provides inquiry access. English routes contain actual translations.

### Flavor tags

Static noninteractive spans use rose, sky or sage fills according to the bean, with rounded corners. Phone tags use 17px text and 4px 12px padding. Bean selection uses anchor links, not tag filtering or tasting-note toggles.

### Information panels and open rows

Course facts use a peach panel with a compact definition list, dividers and a closing inclusion note; padding becomes 24px on phones. The SOP uses a warm cream panel, and the parameter lesson uses sky. Audience statements, course sequence, care notes and bean descriptions stay as open rows with quiet dividers. Bean products are two-column articles rather than a generic boxed card library.

### Parameter lesson

Four native buttons for water temperature, grind, coffee/water and time share a four-column row. `aria-pressed` communicates selection; an active blue underline and translucent paper fill reinforce it. The script replaces heading, explanation, practice tip and SVG symbol; the live region communicates updates. On phones the separate large symbol hides and text remains readable. The sidecar control sample represents these visual states; the complete content-switching behavior lives in `assets/site.js`.

### Native FAQ

Each `details`/`summary` pair has an open-row divider, a generous clickable summary and an inline plus SVG. Opening changes the summary to blue and rotates the plus 45 degrees; the browser provides keyboard disclosure behavior. There are no input fields, cart, checkout, payment UI or backend components in this prototype.

## Do's and Don'ts

### Do:
- **Do** preserve the original blue/cream Logo and locally hosted Huninn.
- **Do** keep body text at 19px on desktop and 18px on phones, with generous leading.
- **Do** pair authentic people photographs with original illustrations and identify illustrative situations honestly.
- **Do** retain visible keyboard focus, native disclosure semantics and reduced-motion support.
- **Do** use the existing LINE inquiry destination for course and bean actions.

### Don't:
- **Don't** replace real instructor or classroom evidence with generated people.
- **Don't** present flavor illustrations as ingredients or practice illustrations as actual packaging.
- **Don't** treat derived sidecar ramps as implemented CSS tokens.
- **Don't** turn the current hero order or open-row composition into a prohibition on future surface layouts.
