---
name: Ruru Coffee Journal — Signature
description: A sky-blue photography book for learning a personal coffee ritual.
colors:
  paper: "#fbf9f3"
  cream: "#f3f0e7"
  sky: "#cfe4ed"
  ink: "#173b4b"
  blue: "#25576b"
  muted: "#48616c"
  line: "#bfced1"
typography:
  display:
    fontFamily: "'Noto Serif TC', serif"
    fontSize: "clamp(55px, 6.4vw, 96px)"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Noto Serif TC', serif"
    fontSize: "clamp(38px, 3.6vw, 58px)"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Noto Serif TC', serif"
    fontSize: "clamp(29px, 2.8vw, 43px)"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, 'Noto Sans TC', sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.85
  body-phone:
    fontFamily: "Manrope, 'Noto Sans TC', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Manrope, 'Noto Sans TC', sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.85
spacing:
  phone-gutter: "20px"
  button-block: "15px"
  button-inline: "21px"
  content-gap: "30px"
  spread-gap: "65px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "15px 21px"
  button-primary-hover:
    backgroundColor: "{colors.blue}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "15px 21px"
  button-outline-hover:
    backgroundColor: "#ffffff66"
  link-plain:
    textColor: "{colors.ink}"
    padding: "8px 0"
  flavor-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "18px 5px 22px"
  bean-menu-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "23px 16px"
  bean-menu-row-selected:
    backgroundColor: "#fbf9f34d"
  invitation-plate:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.ink}"
    padding: "30px 32px 26px"
    width: "395px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  lesson-fact-row:
    textColor: "{colors.ink}"
    padding: "13px 0"
---

# Design System: Ruru Coffee Journal — Signature

## Overview

**Creative North Star: "The Independent Coffee Photography Book"**

The Independent Coffee Photography Book uses sky-blue paper, dark blue ink and generous photographic spreads to make a personal coffee ritual feel approachable. Chinese serif headings carry the expressive voice; large sans-serif copy and plain controls keep the practical information easy to read.

This records the implemented signature world in design-signature.html and assets/signature.css, with behavior in assets/signature.js. It applies to future work explicitly extending that world; it does not restyle index.html or the five legacy variants. The build is code-led under delegated creative direction, without an approved visual comp. Preserve the supplied official logo unchanged and keep photographs of the teachers authentic.

**Key Characteristics:**

- Sky blue, warm paper and dark blue ink.
- Large Chinese serif headings with readable supporting copy.
- Square photographic spreads, overlapping information plates and ruled lists.
- Visible flavor selection and direct LINE inquiries.

## Colors

The sidecar tonal ramps are derived preview extensions; they are not shipped CSS scales. Plain links inherit the body weight rather than the action-label weight.

The palette pairs the logo's sky-blue family with warm paper and legible dark blue ink. Values in the frontmatter are normative and map directly to the root CSS properties with the same names.

### Primary

- **Sky Paper** (`sky`): broad flavor surfaces and the overlapping invitation plate.
- **Blue Ink** (`ink`): headings, body text, solid inquiry actions and selected control underlines.
- **Deep Blue** (`blue`): primary-action hover, text selection and keyboard focus outlines.

### Neutral

- **Warm Paper** (`paper`): page canvas, caption labels and text on dark actions.
- **Cream Paper** (`cream`): the closing spread's quiet tonal change.
- **Muted Blue Gray** (`muted`): supporting copy, captions and disclosures.
- **Paper Rule** (`line`): header edges, fact rows and the fixed mobile action bar.

The bean menu also uses translucent ink rules and a translucent paper selection fill. White is used for the photographic caption and the outline-action hover wash. Peach is declared in CSS but unused in this build and is not a normative palette role.

**The Logo-to-Paper Rule.** Use the supplied logo as the identity anchor; carry its sky-blue family into broad paper-like surfaces and retain dark ink for text and actions.

## Typography

**Display Font:** Noto Serif TC, with serif fallback.
**Body Font:** Manrope for Latin and Noto Sans TC for Chinese, with sans-serif fallback.

**Character:** generous Chinese serif strokes give the journal its voice; the sans-serif supporting layer keeps prices, facts and actions clear. The hierarchy uses independent responsive sizes rather than a strict mathematical scale.

### Hierarchy

- **Display:** the opening Chinese title uses the frontmatter display role. At phone width it becomes `clamp(33px, 8.4vw, 55px)` with line-height (1.65); below 360px it is (30px). English has its own wrapping and sizing rules: desktop `clamp(48px, 4.4vw, 72px)`, phone (44px / 1.3).
- **Headline:** shared section headings use the headline role; phones use (35px / 1.55), with English at (34px). The closing headline is larger: `clamp(60px, 6vw, 96px)` / (1.35), then (52px / 1.5) on phones.
- **Title:** the featured bean uses the title role, then (30px / 1.65) on phones. The lesson subheading has its own (41px / 1.55) treatment, then (34px) on phones.
- **Body:** the body roles define the main reading size. Most prose uses a more generous line-height (1.95). Text length follows the spread columns rather than a universal character limit.
- **Label:** action labels use the label role. Navigation and fact rows are (17px); phone sticky actions are (16px). Captions, materials notes and disclosures range from (13–16px), depending on their context.

**The Readable Journal Rule.** Keep main body copy at 19px on desktop and 18px on phones. Smaller captions and functional labels have their own roles; they are not a substitute for body copy.

## Layout

The signature world uses wide photographic spreads, asymmetrical image-to-copy ratios and solid rectangular information plates. The header, opening and content spreads cap at (1600px); blue-section children and closing content cap at (1344px). Desktop outer gutters are (4vw) for the header/opening and (8vw) for the main spreads. Main content gutters settle to (128px) above 1600px.

The opening image is offset by (12%) and sits in a (550px) tall frame. Its invitation plate overlaps the lower left. Course content uses a (1.05fr / 1fr) grid with a (75px) gap; flavor content uses (1.15fr / 1fr) and a (65px) gap. People content begins at (1.5fr / 1fr). Sections use substantial vertical padding, generally (80–120px) on desktop.

At 1200px the main gutters become (6vw) and gaps reduce. At 980px navigation collapses behind a menu button, opening supporting copy gets its own row, and people content becomes one column. At 700px content stacks with (20px) gutters and approximately (55–70px) vertical section padding. The photograph remains offset relative to the invitation plate; the plate becomes part of the vertical flow with a (-25px) overlap. Course and bean actions remain available in a fixed two-column bottom bar with safe-area padding; the body reserves (66px + safe area). At 359px the header and prominent type compact again.

## Elevation & Depth

Depth comes from photograph crops, solid paper captions, section color changes and overlapping planes. There are no elevated card shadows or hard offset shadows in the signature UI. A single diffuse navigation shadow distinguishes the open mobile menu; photograph-caption text has a soft shadow for legibility over the image.

### Shadow Vocabulary

- **Open navigation:** `0 10px 20px #173b4b12`; only on the collapsed navigation surface.
- **Photograph-caption text:** `0 1px 9px #0009`; white text over the opening image.

**The Paper Overlap Rule.** Create structural depth through solid surface overlaps and photographic framing. Keep the small diffuse shadow confined to the open mobile navigation.

## Shapes

Photographs, plates, buttons and ruled menu rows use square edges. Component corners have no rounded treatment. Thin one-pixel rules provide structure; the selected flavor control uses a three-pixel underline. The official logo retains its supplied circular artwork. Arrow icons are inline stroked SVG with rounded joins and caps, generally (22px) with a (1.5) stroke width. The custom scrollbar's (8px) radius is a browser detail rather than a component corner token.

## Components

### Buttons

Plain, firm rectangular actions. The primary action uses Blue Ink with Warm Paper text, a one-pixel ink border, minimum height (57px) and the documented padding. Hover changes its fill to Deep Blue over (0.2s). The outline variant keeps ink text and border over a transparent surface; hover adds a white translucent wash. General plain links have a bottom rule, minimum height (48px) and an arrow that moves (4px) on hover. The opening's secondary link is a compact unruled variation. Keyboard focus on links and buttons uses a (3px) Deep Blue outline offset by (6px).

### Cards / Containers

The invitation plate is a square Sky Paper information surface rather than a general card family. It carries the course title, short copy, price/duration and two LINE inquiry actions. Its desktop width and padding appear in the frontmatter; on phones it uses full available width and (25px 25px 24px) padding. Photo captions are small Warm Paper plates, or white text directly over the opening image. Do not extrapolate a generic card grid from these patterns.

### Navigation

Desktop navigation is a horizontal row with a fine underline that grows across the label on hover and on the current section. Section tracking sets `aria-current="location"`. At 980px and below, the menu button controls a full-width paper dropdown; it announces expanded state, closes after a section link is chosen, and closes with Escape while returning focus. The separate language control is supplied by the site's bilingual layer. This header scrolls with the page; the phone inquiry bar is fixed.

### Flavor Selector

Three native buttons form a ruled row, with serif labels and equal available width. Unselected buttons use opacity (0.8); hover and selection use full opacity. `aria-pressed="true"` adds the ink underline. Selection replaces the feature photograph, coffee name, flavor notes, description and inquiry link from active catalog data. The result is a polite live region. It does not filter away the full bean menu. The selected picture can enter with a (0.35s) opacity/translation animation; reduced-motion settings disable animations and transitions.

### Bean Menu

Ruled native button rows show a bean name, flavor notes and an arrow. Hover and selection add translucent Warm Paper. A selected row updates the same feature and synchronizes its pressed state with the flavor controls. Desktop rows have three columns; phones move notes under the name with the arrow spanning both lines. The catalog is a sample display; availability and purchasing are confirmed through LINE.

### Course Facts

A definition list uses one-pixel dividers and a two-column label/value layout, with muted labels. Its desktop column definition is (100px / 1fr) with a (25px) gap, adapting at narrower widths. It keeps the class facts readable beside the real classroom photograph.

No input field, checkout form, tooltip or chip component is shipped on this signature page; this document defines none.

## Do's and Don'ts

### Do:

- **Do** preserve the official logo and authentic teacher photographs.
- **Do** keep body copy at the documented desktop and phone sizes.
- **Do** use native buttons, visible focus outlines and aria-pressed for flavor and bean selection.
- **Do** keep course and bean inquiry actions leading directly to LINE.
- **Do** disclose illustrative photography and sample catalog content where the implemented page does.

### Don't:

- **Don't** replace the signature world with repeated equal marketing cards or a dark luxury treatment.
- **Don't** fabricate teacher portraits, testimonials, stock promises or equipment gifts.
- **Don't** turn the sample bean menu into a public checkout action.
- **Don't** apply this signature specification retroactively to the legacy variants.

Documentation limits: source and the provided desktop/phone captures were inspected. The separate finish review owns the current craft verdict; this record does not assert an approved visual comp or certify every interactive state. The unused peach declaration is deliberately not canonized; no UI repairs are part of this documentation pass.
