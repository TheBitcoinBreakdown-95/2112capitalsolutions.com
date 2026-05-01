# 2112 Capital Solutions — Master Design Guide

**Codename:** Apex Constructivist
**Version:** 1.4 (Updated 2026-04-30 — direction renamed to Apex Constructivist; honest reframe of category)
**Last Updated:** 2026-04-30
**Platform:** Astro (deployed via GitHub Actions to Hostinger)
**URL:** 2112capitalsolutions.com

---

## Decisions Locked

| # | Decision | Locked value | Date | Notes |
|---|---|---|---|---|
| 1 | Primary emerald | `#0a5a36` | 2026-04-29 | Tuned variant — visually identical to AI-rendered at hero size, more legible at small/UI sizes |
| 2 | Display serif | Libre Bodoni | 2026-04-29 | Free, Google Fonts. Paid escalation path: Canela Light, Tiempos Headline, Didot LT Std. *May be superseded if Apex Modernist visual register is adopted (decision 7).* |
| 3 | Sibling relationship to TBB | S2 — Cousin | 2026-04-29 | Share era/spirit, visibly distinct family. Third tone: cool greige `#d8d6d0` |
| 4 | Logo customization | Defer; use AI reference image | 2026-04-29 | Use [Inspiration-images/f2904f8e-7355-4f29-9bf3-38a11189fa7a.png](../Inspiration-images/f2904f8e-7355-4f29-9bf3-38a11189fa7a.png) as canonical until type-set or proprietary draw |
| 5 | **Brand archetype priority** | **Ruler primary, Caregiver secondary** (FLIPPED from original) | 2026-04-30 | TBB carries the Caregiver weight at the personal-brand level (founder's videos, content, meetups). 2112 is the institutional brand — its job is to project firm-level authority that elevates the personal-brand work. The hands-on warmth lives in TBB; 2112 makes the statement of authority. |
| 6 | **Emotional staging across user journey** | Visual identity locks Ruler-led; content modulates other emotions through page progression | 2026-04-30 | See "Journey Staging" section below. Visual = constant. Content (copy, imagery, narrative pacing) = the relationship-builder. Solves the "styles can't be mixed" problem from the 35-style spread. |
| 7 | **Visual register** | **Apex Constructivist** (Apex compositional grammar + Constructivist red-prominent palette) | 2026-04-30 | Originally explored as "Apex Modernist" (Palantir/Anduril category) but our actual color philosophy uses red as a structural element, not a quiet accent. That shifts the register into Manifesto/Constructivist territory (Verso Books, Adbusters, Rodchenko/El Lissitzky tradition). Final name: **Apex Constructivist** — captures Apex's "we run things" compositional grammar paired with Constructivist red-prominent palette. Bodoni-led editorial direction superseded. Reference: [sample-apex-modernist.html](sample-apex-modernist.html) (filename retained; content reflects Apex Constructivist v1.3+). |
| 8 | **Logo arrangement** | V14 — vertical accent bar + left-aligned stacked wordmark | 2026-04-30 | Reference: [logo-arrangements-apex.html](logo-arrangements-apex.html) variant 14. Vertical 4px accent bar on the left, "2112" wordmark + "Capital Solutions" sub stacked to the right, left-aligned. Industrial-signage register. Used for hero/footer brand statements. Compact horizontal "\| 2112" used for navbar and tight spaces. |
| 9 | **Abbreviation policy** | No abbreviation. Short form is "2112" alone; long form is "2112 Capital Solutions" or "2112 Capital Solutions LLC" for legal contexts. | 2026-04-30 | Rejected: `CAP_SOL`, `2112_cap_sol`, `2112-cap-sol`, and other snake/kebab variants. Reads cold for non-technical audiences and shortens the firm name without adding character. |
| 10 | **Primary accent color** | Signal red `#e63030` | 2026-04-30 | Locked over emerald. Reference: [sample-apex-modernist.html](sample-apex-modernist.html). Emerald variant ([sample-apex-modernist-emerald.html](sample-apex-modernist-emerald.html)) read softer but lost the operational authority that makes Apex Modernist work. Red kept as the only chromatic accent. |
| 11 | **Star ornament** | Used subtly as decorative separator only | 2026-04-30 | Album-2112 reference reintroduced now that brand is red-accented. Placed in status bar between meta items and in footer copyright as a separator. ~9-11px, signal red, 80-95% opacity. NEVER in main wordmark. |

This document is the binding spec for all design downstream.

---

## APEX CONSTRUCTIVIST — LOCKED SPECIFICATION (v1.4)

This section is the binding spec for all visual and component decisions. The historical sections below (originally written for the Bodoni-led editorial direction) remain as context but are *superseded* by everything in this section.

**On the name:** "Apex Constructivist" captures what we actually built. **Apex** = the compositional grammar (status bars, classifications, indexed protocols, mono labels, technical-document layout — the "we run things" register from Palantir/Anduril/Founders Fund). **Constructivist** = the color philosophy (heavy red + black + white as a structural triad — the Rodchenko/El Lissitzky tradition that Verso Books, Adbusters, and certain manifesto-coded modern brands inherit). The pairing is uncommon enough to be ownable; together it reads as "operationally serious AND ideologically grounded" rather than either alone.

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#000000` | Pure black page background |
| `--bg-elev` | `#0a0a0a` | First-level elevation |
| `--bg-card` | `#111111` | Card surfaces, status bar, readout blocks |
| `--text` | `#f4f4f0` | Primary text — paper white, slightly warm |
| `--text-2` | `#908d85` | Secondary text — body prose, muted labels |
| `--text-3` | `#5a5752` | Tertiary text — captions, deep meta |
| `--line` | `rgba(255,255,255,0.10)` | Subtle structural borders |
| `--line-strong` | `rgba(255,255,255,0.22)` | Emphasized borders |
| **`--signal`** | **`#e63030`** | **Primary chromatic accent — used SPARINGLY** |
| `--signal-dim` | `rgba(230,48,48,0.15)` | Backgrounds for accent highlights |
| `--signal-line` | `rgba(230,48,48,0.35)` | Borders that read as accent |

**Color usage rules:**
- Pure black surface only. No stone-grain texture. Replaced by subtle scanline overlay.
- Signal red is the *only* chromatic color in the entire system. No emerald, no amber, no blue.
- Status colors (success/warn/error/info) only when absolutely required for UX states — and they pair with icon + text + color for WCAG.
- Text-on-black contrast is AAA at all primary/secondary tiers.

### Typography

| Role | Family | License | Weights used |
|---|---|---|---|
| Display + Body | **Space Grotesk** | Free (Google Fonts) | 400, 500, 600, 700 |
| Mono (system, labels, brandmark) | **JetBrains Mono** | Free (Google Fonts) | 400, 500, 600, 700 |

**No serif anywhere.** No Libre Bodoni. No editorial display face. Space Grotesk is chosen for its Akzidenz-Grotesk lineage — closest free match to Söhne / GT America (the paid Apex-canonical fonts).

**Type scale:**

| Level | Size | Weight | Spacing | Family | Usage |
|---|---|---|---|---|---|
| Hero H1 | `clamp(48px, 7vw, 84px)` | 700 | -0.035em | Space Grotesk | Page hero only |
| Module H2 | `clamp(40px, 5vw, 64px)` | 700 | -0.03em | Space Grotesk | Section heads |
| H3 / protocol | 24px | 600 | -0.015em | Space Grotesk | Sub-sections, service titles |
| H4 | 18px | 600 | -0.01em | Space Grotesk | Card titles |
| Body | 15px | 400 | 0 | Space Grotesk | Prose paragraphs |
| Mono label | 11px | 600 | 0.20em UPPERCASE | JetBrains Mono | Section labels, classifications |
| Mono caption | 10-12px | 500 | 0.04-0.18em UPPERCASE | JetBrains Mono | Status, meta, footnotes |
| Brandmark | 18px (compact) / 64-180px (hero) | 700 | 0.02em | JetBrains Mono | "2112" wordmark |

**Italics:** rare, never in display moments. The `em` element used in headlines is *normal-style colored signal red*, not italic.

### Logo System (V14 locked)

**Primary mark — V14 vertical bar + stacked wordmark:**
- 3-4px wide vertical accent bar in signal red (`#e63030`)
- Bar height matches the cap-height of the "2112" numerals
- "2112" wordmark in JetBrains Mono Bold 700, white
- "Capital Solutions" sub-line in JetBrains Mono Medium 500, mono uppercase, generous letter-spacing
- Stack alignment: left-aligned to the right of the bar
- Gap between bar and wordmark: ~7-8px (tight, deliberate)

**Compact mark — navbar / footer:**
- Same vertical bar + "2112" wordmark, *inline* horizontal layout
- "Capital Solutions" sub omitted at this size
- 18px font size for compact applications

**Favicon — pending:**
- Use the compact mark scaled down first (no separate favicon yet)
- If favicon at 16×16 proves illegible, add a simplified iconic mark later

**Star ornament (album-nod, locked subtle):**
- ★ character, signal red, 9-11px
- Used as separator in status bar and footer copyright
- Opacity 80-95%
- NEVER in the main wordmark or hero

### Layout Primitives

| Property | Value |
|---|---|
| Container max-width | 1280px |
| Container narrow | 760px |
| Page margin (desktop) | 32px |
| Page margin (mobile) | 24px |
| Border-radius | 0 (sharp corners everywhere) |
| Section vertical padding | 80px |

### Background Texture

Pure black background with a subtle scanline overlay (NOT stone-grain — that's the editorial spec):

```css
body::before {
  content: ''; position: fixed; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg,
    transparent 0, transparent 3px,
    rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px);
}
```

### Iconography & Motifs

| Element | Glyph | Purpose |
|---|---|---|
| Bullet | `▸` | Protocol/service list items, signal red |
| Status indicator | `■` | OPERATING flag in mono labels |
| Star | `★` | Album-nod separator (subtle, decorative) |
| Section index | `MODULE 01`, `PROT.001`, `SEQ.001`, `01.01` | Mono UPPERCASE labels |

No icons from icon libraries. Glyphs only, used sparingly.

### Component Tokens

**Buttons:**
- Primary: `bg: signal red`, `text: white`, sharp corners, mono UPPERCASE, → arrow suffix
- Ghost: `bg: transparent`, `text: white`, white border, sharp corners
- Padding: 16px × 28px (regular), 10px × 16px (small)
- Transitions: 0.15s

**Status bar (top of page):**
- Border-bottom: signal red line at 35% opacity
- Mono UPPERCASE, 10.5px, 600 weight
- Layout: ENTITY ★ JURIS · FY (with star separator)

**Module sections:**
- 80px vertical padding
- Top border: hairline white (`--line`)
- Module classification: signal red mono UPPERCASE with reference numbers
- Title: 700 weight Space Grotesk, large

**Protocol rows (services):**
- Three columns: `protocol-id (200px)` / `body` / `spec (240px)`
- Border-top: hairline white
- Protocol ID: 36px mono Bold, signal red
- Spec column: signal red left border, mono UPPERCASE

**Method steps:**
- Two columns: `num (200px)` / `body`
- Numbered SEQ.001 → SEQ.005
- Border-top: hairline white

**References block:**
- Background: card surface, hairline border
- Mono throughout
- Numbered ordered list
- Links: signal red, dotted underline

**Footer:**
- Top: 2px signal red border (heavy closure)
- Four-column grid
- All mono UPPERCASE
- Footer-bottom: hairline white border-top, `★` separator in copyright line

### Motion

- Hover transitions: 0.15s (faster than editorial 0.3s)
- No scroll reveals
- No glitch / matrix rain / lightning / scramble effects
- `prefers-reduced-motion`: respected — animations forced to 0.01ms

### Cursor

Standard browser cursor. Pointer on interactive elements. No crosshair (TBB territory).

### Voice / Copy Register

- Direct, technical, declarative
- Sentence case for body; UPPERCASE for mono system labels
- Indexed sections (`MODULE 01`, `PROT.001`, `SEQ.001`)
- Footnoted citations in references block
- "Operator" voice for system content; "considered" voice for engagement-oriented copy (services, methodology, contact)

### Reference Implementation

Locked spec rendered live at: [sample-apex-modernist.html](sample-apex-modernist.html)

Logo arrangements (V14 baseline + 19 variants): [logo-arrangements-apex.html](logo-arrangements-apex.html)

---

---

## Journey Staging (locked 2026-04-30)

The visual identity expresses a single dominant emotion. Other emotions emerge through content as the visitor moves through the site. This solves the problem that visual styles can't be cleanly mixed — each is a complete system.

| Stage | Where on the site | Emotions delivered | How |
|---|---|---|---|
| **First impression** (5 seconds) | Hero, header, opening section | Ruler · Reverent · Knowledgeable · Premium · Competence | Visual identity itself — palette, typography, layout primitives |
| **Mid-page** (30 seconds — 2 minutes) | Services, methodology, principles | Principled · Belonging | Copy and content choices — worldview language, who-this-is-for cues, deliverables that signal seriousness |
| **Late-page / deep engagement** (3+ minutes) | Testimonials, case studies, contact | Empowering · Caregiver | Narrative voice — outcomes, warmth in attribution, "we'll bring you along" language, real prices, no funnel friction |

**Implications for design:**
- Hero typography is the loudest expression of authority. No softening.
- Service descriptions can use deliverables lists and procedural language without breaking the register.
- Testimonials and "what to expect" copy can warm the tone without changing visual primitives.
- The TBB personal brand carries Caregiver at a different layer — it's not 2112's job to *visually* project warmth. 2112's job is to *say* the firm has it (through testimonials, engagement memos, case studies) without *looking* warm.

---

## 1. Project Identity

### What It Is
A premium private stewardship firm offering hands-on consulting in Bitcoin custody, AI workflow, privacy, and self-hosting. Phased rollout: Bitcoin services lead today; AI, privacy, and self-hosting layer on as client demand materializes. Behind the scenes, 2112 Capital Solutions LLC is also the legal/financial shell for The Bitcoin Breakdown's media operation.

### Aesthetic Influences (under active reconsideration — see decision 7)

**Editorial Bodoni-led direction (v1.0 spec):**
- **Geneva Private Bank** — quiet authority, hairline rules, restrained typography, brass-plate engraving
- **Polished Obsidian** — depth, discretion, weight; the surface that records but does not shout
- **Editorial Luxury** — Vogue, Bloomberg Businessweek, The New Yorker — high-contrast Didone serif against pure dark
- **Classical Stewardship** — Patek Philippe's "you merely look after it for the next generation"

**Apex Modernist direction (under evaluation):**
- **Operational Authority** — Palantir, Anduril, Founders Fund, Bridgewater — neo-grotesque + mono, technical-document layouts
- **Engineer-King Register** — "we run things" expressed through tactical readouts, indexed sections, footnoted citations
- **Stripe Press / Long Now** — restrained black/white/single-accent, hard typography, no editorial flourish
- **Classified-Document Texture** — scanlines, status bars, mono labels, classification headers

### Personality Spectrum (post-archetype-flip)
- Authoritative without being intimidating
- Premium but never showy
- Knowledgeable but never pedantic
- Principled but never preachy
- Hands-on but never anxious
- Confident enough to be direct

### What This Site Is NOT
- A crypto trading platform or price tracker
- A meme-heavy Bitcoin-bro brand
- A doomer "fiat is collapsing" alarm site
- A cypherpunk technical-jargon-fest (TBB occupies that space, not 2112)
- Anything that looks like it's selling you a course
- A generic SaaS / startup tech consultancy (Linear/Vercel cliché)
- Visually similar to TBB (sister brand, not twin)

---

## 2. Color System

### Primitives

| Token | Value | Usage |
|---|---|---|
| `obsidian` | `#070707` | Page background — soft near-black with stone-grain texture |
| `obsidian-soft` | `#0c0c0c` | Card surfaces, second-level elevation |
| `obsidian-card` | `#0e1014` | Form inputs, table rows, terminal backgrounds |
| `obsidian-elevated` | `#14161d` | Modals, popovers |
| `obsidian-code` | `#0a0c10` | Code block backgrounds |
| `emerald` | `#0a5a36` | Primary accent — interactive elements, emphasis (OPEN) |
| `emerald-saturated` | `#084d2e` | Saturated core — extracted from logo image |
| `emerald-rendered` | `#08472b` | The exact AI-rendered emerald (most muted variant) |
| `emerald-vibrant` | `#0c6a3f` | Higher-saturation variant for small UI use |
| `cream-cousin` | `#d8d6d0` | Primary text — cool greige (S2 — distinct from TBB's warmer cream) |
| `muted` | `#807d75` | Secondary text — body prose, descriptions |
| `dim` | `#4f4d47` | Tertiary text — hints, placeholders, disabled |

### Semantic Tokens

| Token | Value | Usage |
|---|---|---|
| `background` | `#070707` | Page background |
| `surface` | `#0c0c0c` | Elevated surfaces (cards, modals) |
| `surface-elevated` | `#14161d` | Second-level elevation |
| `accent` | `#0a5a36` | Primary interactive color |
| `accent-saturated` | `#084d2e` | Static logo color, decorative emerald |
| `accent-vibrant` | `#0c6a3f` | Hover/focus emphasis |
| `text-primary` | `#d8d6d0` | Headlines, strong body text |
| `text-secondary` | `#807d75` | Body paragraphs, descriptions |
| `text-muted` | `#4f4d47` | Hints, captions, timestamps |
| `border-default` | `rgba(10, 90, 54, 0.10)` | Subtle structural borders |
| `border-hover` | `rgba(10, 90, 54, 0.25)` | Hover state borders |
| `border-focus` | `rgba(10, 90, 54, 0.55)` | Focus ring color |
| `selection-bg` | `rgba(10, 90, 54, 0.30)` | Text selection background |
| `selection-text` | `#0a5a36` | Text selection foreground |

### Opacity Scale (Emerald)

| Token | Value | Usage |
|---|---|---|
| `emerald-glow` | `rgba(10, 90, 54, 0.45)` | Hover glows, text shadows |
| `emerald-dim` | `rgba(10, 90, 54, 0.18)` | Focus ring background |
| `emerald-subtle` | `rgba(10, 90, 54, 0.07)` | Table row hover, tag active fill |
| `emerald-overlay` | `rgba(10, 90, 54, 0.04)` | Card ambient glow |

### Status Colors

| Status | Color | Dim | Border |
|---|---|---|---|
| Success | `#4ADE80` | `rgba(74, 222, 128, 0.1)` | `rgba(74, 222, 128, 0.2)` |
| Warning | `#FACC15` | `rgba(250, 204, 21, 0.1)` | `rgba(250, 204, 21, 0.2)` |
| Error | `#F87171` | `rgba(248, 113, 113, 0.1)` | `rgba(248, 113, 113, 0.2)` |
| Info | `#60A5FA` | `rgba(96, 165, 250, 0.1)` | `rgba(96, 165, 250, 0.2)` |

All status indicators must combine **icon + text + color** (never color alone) for WCAG compliance.

### Stone-Grain Texture

The polished-obsidian feel is achieved by overlaying a very subtle dual-radial-gradient noise pattern on the page background — never in the logo, never in type. CSS:

```css
body {
  background:
    radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 0 0 / 3px 3px,
    radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px) 1px 1px / 5px 5px,
    var(--obsidian);
}
```

---

## 3. Typography

### Font Families

| Role | Family | Fallback | Weight Range |
|---|---|---|---|
| Display (logo + headlines) | Libre Bodoni | Bodoni Moda, Georgia, serif | 400, 500, 600 |
| Body / UI | Inter | system-ui, sans-serif | 100, 200, 300, 400, 500 |
| Monospace (code, system, prices) | JetBrains Mono | Fira Code, monospace | 300, 400, 500 |

**Google Fonts Import:**
```
https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@400;500;600&family=Inter:wght@100;200;300;400;500&family=JetBrains+Mono:wght@300;400;500&display=swap
```

**Design Decision:** Libre Bodoni carries display moments only — wordmark, hero headlines, pull quotes, large numerals (prices, statistics). Body and UI use Inter at light/thin weights for readability and modern restraint. Mono is reserved for code, terminal output, system text, prices, addresses, and decorative numerical elements (the "scientific" voice).

This is a deliberate three-font system — *not* the same as TBB's two-font (single-serif-everywhere) system. TBB unifies through one family; 2112 differentiates *because* it lives across multiple service categories (Bitcoin, AI, privacy, self-hosting) and needs typographic flexibility to span them.

### Type Scale

| Level | Size | Weight | Spacing | Line Height | Family | Usage |
|---|---|---|---|---|---|---|
| Display | `clamp(48px, 8vw, 96px)` | 400 | 0.04em | 0.95 | Libre Bodoni | Hero headlines, large numerical statements |
| H1 | `clamp(36px, 5.5vw, 64px)` | 400 | 0.02em | 1.05 | Libre Bodoni | Page titles |
| H2 | `clamp(28px, 4vw, 44px)` | 400 | 0.01em | 1.15 | Libre Bodoni | Section heads |
| H3 | `clamp(20px, 2.6vw, 28px)` | 500 | 0em | 1.25 | Inter | Sub-section heads |
| H4 | `18px` | 500 | 0em | 1.3 | Inter | Card titles |
| Body | `16.5px` | 300 | 0em | 1.7 | Inter | Prose paragraphs |
| Body small | `14.5px` | 300 | 0em | 1.6 | Inter | Card bodies, descriptions |
| Nav | `13px` | 400 | 0.04em | — | Inter | Navigation links |
| Caption | `12px` | 400 | 0.04em (mono) | — | JetBrains Mono | Dates, reading time, meta |
| Overline | `11px` | 400 | 0.18em (uppercase) | — | JetBrains Mono | Hero overlines, eyebrows |
| Section Label | `11px` | 400 | 0.20em (uppercase) | — | JetBrains Mono | Section identifiers |
| Tag | `10px` | 500 | 0.14em (uppercase) | — | JetBrains Mono | Category/topic chips |
| Logo Sub | `13px` | 400 | 0.27em (uppercase) | — | Inter | "CAPITAL SOLUTIONS" |

### Logo Lockup Type Specs

The canonical wordmark composition (the AI-generated reference image is the visual target):

| Element | Spec |
|---|---|
| `2112` | Libre Bodoni 400, `clamp(72px, 14vw, 144px)`, `0.12em` letter-spacing, emerald `#0a5a36` |
| Hairline rule | 1px stroke, full width of "2112," same emerald color, gap above = 0.18-0.25× numeral height |
| `CAPITAL SOLUTIONS` | Inter 200/300, sized at ~14% of "2112" height, `0.27em` letter-spacing, uppercase, same emerald |

### Pull Quote

| Property | Value |
|---|---|
| Size | `clamp(22px, 3.2vw, 32px)` |
| Family | Libre Bodoni |
| Weight | 400 |
| Style | Italic |
| Color | `#0a5a36` (emerald) |
| Decorators | 60px emerald hairlines above and below, centered |
| Attribution | 12px Inter mono uppercase, 0.18em letter-spacing, muted |

### Blockquote

Standard blockquotes use a 1px emerald-25% left border, 24px left padding, 18px italic Libre Bodoni text, with a 13px Inter muted attribution line below.

---

## 4. Spacing System

**Base unit:** 16px (matches TBB — proven scale)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon gaps, tight padding |
| `space-2` | 8px | Button icon spacing, small gaps |
| `space-3` | 16px | Standard padding, form hint margin |
| `space-4` | 24px | Card padding, paragraph spacing |
| `space-5` | 32px | Section sub-spacing, terminal padding |
| `space-6` | 48px | Between related sections |
| `space-7` | 64px | Footer padding, major breaks |
| `space-8` | 96px | Section vertical padding |
| `space-9` | 128px | Major section separation |
| `space-10` | 192px | Hero vertical padding |

---

## 5. Layout & Grid

### Containers

| Container | Max Width | Usage |
|---|---|---|
| Content | 720px | Prose, articles, forms — optimal reading measure |
| Wide | 1180px | Card grids, header, data tables, full-width sections |
| Full | 100% | Hero sections, backgrounds, dividers |

### Page Margin
- Desktop: `32px`
- Mobile: `24px`

### Breakpoints

| Name | Range | Key Changes |
|---|---|---|
| Mobile | 0–480px | Single column, stacked buttons, mono ticker hidden |
| Tablet | 481–768px | Nav collapses, 2-column grids, smaller hero |
| Laptop | 769–1024px | Full nav, standard layout |
| Desktop | 1025–1440px | All features active |
| Wide | 1441px+ | Content remains contained, generous margins |

### Grid

Card grids use `repeat(auto-fit, minmax(300px, 1fr))` for responsive behavior. Named `.grid--2` and `.grid--3` for fixed-column layouts with mobile collapse to single column.

---

## 6. Components

### Buttons

| Variant | Background | Text | Border | Hover Effect |
|---|---|---|---|---|
| Primary | `#0a5a36` | `#070707` | None | Background → `#0c6a3f`, translateY(-1px), subtle emerald glow |
| Ghost | Transparent | `#d8d6d0` | `1px solid rgba(255,255,255,0.10)` | Border → `#0a5a36`, text → emerald |
| Subtle | Transparent | `#0a5a36` | None | Underline appears (1px hairline) |

All variants: 13px Inter weight-500, 0em letter-spacing (NOT uppercase by default — premium-restraint-coded), 14px × 22px padding. Small variant: 11px text, 10px × 16px padding. Sharp corners (`border-radius: 0`) — luxury-coded restraint.

### Service Cards

Structure: obsidian-card background, 1px transparent border, eyebrow (11px mono uppercase muted), title (22px Libre Bodoni 500), excerpt (14.5px Inter muted), small-caps price line (12px mono emerald, top-bordered).

**Hover effects (layered, restrained):**
1. **Border** — transitions from default to emerald-25%
2. **Slight lift** — translateY(-2px)
3. **Subtle elevation shadow** — `0 12px 32px rgba(10, 90, 54, 0.06)`

No scramble effects. No laser borders. The Caregiver + Ruler register doesn't theatricalize.

### Guide Cards

Same as service cards but with a small category tag at the top (Bitcoin / AI / Privacy / Self-hosting), shorter copy, prominent reading-time meta in mono.

### Forms

**Input fields:** obsidian-card background, 1px default border, 14px × 18px padding, 16px Inter text, italic muted placeholder. No border-radius. Hover: border brightens slightly. Focus: emerald border + 3px emerald-dim focus ring.

**States:** Error: red border, 13px message text below. Success: green border. Each paired with icon + text.

**Label:** 11px Inter uppercase, 0.18em letter-spacing, muted color.

**Search:** Icon inside field (left-aligned), emerald on focus.

**Subscribe:** Horizontal email + button row, stacks vertically on mobile.

### Links

| Variant | Style | Hover |
|---|---|---|
| Inline | Emerald text, 1px emerald-25% underline | Underline solidifies, subtle text glow |
| Standalone | 13px Inter muted + `→` arrow | Emerald text, arrow shifts 4px right |
| Nav | 13px Inter, underline from center | Emerald text + underline expands |

Visited inline links remain emerald (no purple-track distinction).

### Status Toasts

Left 3px colored border, tinted background (status-dim), icon + title + message. Variants: success (green), error (red), warning (yellow), info (blue).

### Code

**Inline:** Emerald text on obsidian-elevated background, 1px default border, 2px × 8px padding, 0.85em mono font.

**Block:** obsidian-code background, 1px border, 24px padding, language label in top-right corner (11px mono uppercase). JetBrains Mono 14px, line-height 1.7.

### Terminal Console

obsidian-soft background, 1px border. Header bar with three colored dots (red/yellow/green, outlined at 40% opacity), title in 11px mono uppercase muted aligned right. Lines show `$` prompt in emerald, output in muted. Blinking emerald block cursor on the last line.

Used sparingly — the terminal is for code/setup demonstrations on Bitcoin/AI/self-hosting service pages, not as a brand-pervading motif.

### Tables

Mono uppercase 11px headers with emerald-15% bottom border. 16px cell padding. Hover rows get emerald-subtle background. First column emphasized (primary text, weight 500).

### Table of Contents

Card container with 1px border. "In This Article" title (11px mono uppercase muted). Links at 15px Inter, preceded by a 12px emerald line that extends to 20px on hover. Active link: emerald text with extended line.

### Tags

10px mono uppercase chips with 1px default border, muted text, 6px × 14px padding. Hover: border brightens, text goes emerald, subtle fill. Active variant: emerald border, emerald text, emerald-subtle background.

Category-coded tags (Bitcoin / AI / Privacy / Self-hosting) use a soft per-category accent inside the same border style.

### Empty States

Centered layout: large muted icon (48px Lucide stroke, 30% opacity), 24px Libre Bodoni title, 15px muted description, optional CTA button.

### 404 Page

Giant faded "404" in emerald (up to 160px Libre Bodoni, 12% opacity). Title overlapping: "This route is unmapped" in primary text. Description: "The page you're looking for doesn't exist — or has been moved as the site evolved." Primary CTA to return home.

### Cookie Banner

Fixed bottom, card background, 1px top border. Flex layout: text + accept/decline buttons. Honest language: "This site uses essential cookies only. No tracking, no analytics, no third parties." Accept and Decline have **equal visual prominence**.

### Skeleton Loading

Card-shaped container with animated shimmer lines. Lines at various widths (40%, 70%, 90%) in obsidian-elevated with a sweeping emerald-tinted highlight (shimmer animation, 2s loop).

### Scroll Progress Bar

Fixed top, full width, 1px height (thinner than TBB's 2px — restraint). Solid `#0a5a36` emerald with `0 0 6px rgba(10, 90, 54, 0.3)` glow. Width calculated from scroll position.

---

## 7. Logo & Branding

### Logo Lockup Variants

| Variant | Spec | Usage |
|---|---|---|
| Full Lockup | "2112" + hairline rule + "CAPITAL SOLUTIONS" beneath | Hero, major brand moments, business cards |
| Compact Lockup | "2112" + "CAPITAL SOLUTIONS" inline (no rule) | Header navigation, footer, tight spaces |
| Wordmark Only | "2112" alone in Libre Bodoni 400, emerald | Favicon, watermark, decorative |
| Mark | (TBD if we ever add a small symbol — currently none) | — |

### Clear Space

Minimum clear space around any logo variant = 1× the height of "2112" numeral. No element may encroach on this space.

### Reference Image

The canonical visual target is `Inspiration-images/f2904f8e-7355-4f29-9bf3-38a11189fa7a.png` — the AI-generated lockup. Production renderings should match this composition's tracking (`0.12em` numerals, `0.27em` caps), proportions (~14% caps height ratio), and color (extracted: `#08472b`–`#084d2e` rendered, `#0a5a36` tuned for screens).

---

## 8. Photography Treatment

All photographs receive a unified treatment to fit the polished-obsidian aesthetic:

- **Filter:** `grayscale(40%) contrast(1.05) brightness(0.85)` — softer than TBB's heavy desaturation
- **Overlay:** `linear-gradient(135deg, rgba(10,90,54,0.10), rgba(7,7,7,0.20))` with `mix-blend-mode: overlay`
- **Hover:** Grayscale reduces to 20%, brightness increases slightly
- **Captions:** 12px Inter italic, muted color, 0.04em letter-spacing

### Imagery Subject Matter

- Architectural interiors (private libraries, panelled rooms, vault hallways)
- Hands engaged in considered work (note-taking, hardware setup, signing documents)
- Material objects (hardware wallets shot like jewelry, books, brass plates, steel plates for seed backups)
- Never: stock crypto-bro imagery, candlestick charts, lambos, Bitcoin coin renders

---

## 9. Icons

- **Style:** Thin line, 1.5px stroke, rounded caps and joins, no fill
- **Source:** Lucide as base set ([lucide.dev](https://lucide.dev)), MIT licensed
- **Sizes:** 16px (sm), 20px (default), 24px (lg), 32px (xl)
- **Color:** Inherits `currentColor` — muted by default, emerald on hover/active
- **Custom marks:** Service-line glyphs (Bitcoin shield, AI mesh, privacy lock, self-hosting server) drawn as 1.5px-stroke SVGs in the same Lucide visual register, kept simple

---

## 10. Stewardship Interactions

The polished-obsidian aesthetic is expressed through **restraint** — slow, considered motion. No matrix rain. No lightning bolts. No glitch effects. The interactions communicate "we are paying attention" not "we are flashing lights at you."

This is the deliberate inverse of TBB's cypherpunk register. TBB's freedom is loud; 2112's stewardship is quiet.

### Hairline Reveals (Page Load)

On initial load, a single hairline emerald rule scales from `scaleX(0)` to `scaleX(1)` across the top of the viewport over 1.6 seconds with luxury easing. Then fades to 30% opacity. Subtle "this site has loaded" cue.

### Scroll Reveals

Elements enter with `opacity: 0 → 1` and `translateY(24px → 0)` over 1.0 second using luxury easing. Triggered at 12% intersection threshold with -40px bottom root margin.

**Stagger:** Child elements in a `.stagger` container delay by 0s, 0.08s, 0.12s, 0.16s increments. Tighter than TBB's stagger to read as "considered" not "performative."

### Card Hover

Border transitions from default to emerald-25%, card lifts 2px with subtle shadow, optional accent number/label transitions to emerald. No scramble, no laser trace, no glitch. Plain English: it gets *slightly* more interesting.

### Link Hover

Inline links: underline transitions from emerald-25% to emerald-100% with a brief 0.4s emerald glow (no scramble).

Nav links: underline expands from center with a 0.5s luxury ease.

### Number Count-Up (sparing use)

For statistics or testimonial-counts only — numbers count from 0 to target over 1.4s with cubic ease-out. Triggered by scroll intersection (50% threshold, fires once). Used at most twice per page.

### Hero Glow

Subtle radial emerald gradient behind hero content pulses with an 8-second animation — opacity oscillates between 0.05 and 0.10, scale between 1.0 and 1.04. Slower and quieter than TBB's hero pulse.

### Cursor

Default browser cursor on text. `pointer` cursor on interactive elements. **No crosshair cursor** — that's TBB's targeting language; 2112's interaction language is calm.

### What 2112 Does NOT Do

- No matrix rain
- No lightning bolt page transitions
- No glitch text on hover
- No scramble effects on titles
- No data-stream ticker
- No hash watermark decorations
- No nav sparks
- No static-discharge text-selection effects

These belong to TBB's freedom-and-energy register. 2112's register is steady-and-considered. The absence is the brand statement.

---

## 11. Motion & Animation

### Easing Functions

| Name | Value | Usage |
|---|---|---|
| Luxury | `cubic-bezier(0.23, 1, 0.32, 1)` | Scroll reveals, card hovers, nav transitions |
| Out | `cubic-bezier(0.16, 1, 0.3, 1)` | Hairline rule reveals, divider transitions |
| Soft | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover state changes, button transitions |

### Hover Transitions

Standard hover transitions use 0.3–0.4 seconds. Card transforms use luxury easing. Glow effects fade with soft easing.

### Reduced Motion

All animations and transitions are disabled via `prefers-reduced-motion: reduce`. Reveals show immediately at full opacity. Hero glow is set to static. All `animation-duration` and `transition-duration` forced to `0.01ms`.

---

## 12. Accessibility

### Focus States
- **Style:** 2px solid emerald outline, 3px offset, 2px border-radius
- **Selector:** `:focus-visible` only (no outline on mouse click)

### Skip Link

Hidden off-screen by default. Appears at top-left on Tab keypress: emerald background, obsidian text, 8px × 20px padding, 13px uppercase with 2px letter-spacing.

### Color Independence

All status states (success, error, warning, info) combine icon + text + color. Color is never the sole indicator.

### Touch Targets

Recommended minimum: 44px × 44px. Absolute minimum: 32px × 32px (slightly above TBB's 24px due to the more refined typography requiring more generous targets).

### Contrast Ratios

| Pair | Ratio | WCAG |
|---|---|---|
| Text-primary `#d8d6d0` on Obsidian `#070707` | 14.4:1 | AAA |
| Text-secondary `#807d75` on Obsidian | 6.1:1 | AA Large + AAA Small |
| Emerald `#0a5a36` on Obsidian | 3.7:1 | AA Large only — never use emerald for body text |
| Emerald-vibrant `#0c6a3f` on Obsidian | 4.4:1 | AA |

---

## 13. Gestalt Principles (Codified)

### Proximity
- Cards within the same section use `space-4` (24px) gaps
- Sections are separated by `space-8` (96px) padding
- Related meta elements (date · reading time · category) use `space-4` gaps with `·` separators
- Unrelated sections have hairline-rule dividers between them

### Similarity
- **Emerald = interactive.** Anything emerald can be clicked, hovered, or acted upon
- **Cream-cousin = readable.** Primary text is for reading, not interacting
- **Mono = system / data.** JetBrains Mono signals technical, machine-generated, or numerical content
- **Bodoni = brand voice.** Libre Bodoni appears for headlines and brand moments — its presence raises register

### Continuity
- Eye flow: overline (mono) → headline (Bodoni) → body (Inter) → CTA → cards
- Emerald accents create a visual thread that guides scanning
- Hairline rules signal "structural break" without disrupting flow
- Scroll progress bar reinforces top-to-bottom reading direction

### Figure-Ground
- Soft near-black background pushes content forward
- Cards use `#0c0c0c` — barely distinguishable but perceptually "elevated"
- Emerald elements are always foreground; they never recede
- Hover states amplify figure-ground separation (subtle lift + shadow)

### Closure
- Card borders are restrained at rest — the reader's brain completes the rectangle from card content alignment
- Hairline rules can be partial — the eye completes them

---

## 14. Semiotics Map

### Color as Symbol

| Element | Symbolism |
|---|---|
| **Emerald** (`#0a5a36`) | Wealth (the "money green" association), longevity (Japanese *kame*, cosmological green), depth, considered patience. Saying "emerald" instead of "green" is itself a register choice. |
| **Polished Obsidian** (`#070707`) | Discretion, weight, the surface that records. The slight texture is the difference between "default black" and "considered black." |
| **Cream-Cousin** (`#d8d6d0`) | Cool greige, neutral but warm-adjacent. Distinct from TBB's parchment cream. The neutrality says "we are not warm-leaning storytelling; we are clear, capable counsel." |

### Typography as Symbol

| Element | Symbolism |
|---|---|
| **Libre Bodoni** | Editorial luxury, considered authority. Didone-family serifs say: "this is publishing-grade work, not ephemeral." Light weight says: "confident enough to whisper." |
| **Inter** | Modern competence. Neutral, readable, contemporary. Inter at thin weights signals "tech-aware" without screaming "tech startup." |
| **JetBrains Mono** | System and proof. Mono is reserved for things that must be exact: prices, addresses, code, dates, system text. Its presence signals "this is precise." |

### Motif as Symbol (sparingly)

| Motif | Symbolism |
|---|---|
| **Hairline rule** | Engraved precision. The rule between "2112" and "CAPITAL SOLUTIONS" says: "this is a brass plate, not a poster." |
| **Stone-grain texture** | Material weight. The polished surface that records. Distinct from flat blacks. |
| **Mono numerals** | Verifiability. Prices, addresses, statistics in mono signal "precise figures, not approximations." |

What's deliberately absent: lightning bolts, hexagonal patterns, B-coin logos, gold accents, Roman columns, turtle shells, five-pointed stars, circuit-board traces. We considered all of them and rejected each for register-breaking reasons documented in the project decision log.

---

## 15. Trust Signals & Emotional Design

### Visual Credibility Cues

- **No stock photography.** All imagery receives the unified emerald-tint treatment, signaling "curated"
- **Typography signals seriousness.** Libre Bodoni at large sizes communicates editorial authority
- **Generous spacing.** Premium brands use whitespace to signal that content doesn't need to compete
- **Hairline rules as decoration.** Subconsciously reinforce "engraved, considered, deliberate"
- **No ads, no pop-ups, no email gates.** The design itself is a trust signal
- **Equal-prominence Accept/Decline on cookie banner.** No dark patterns
- **Real prices visible on services page.** Transparency over discovery-call-funnels

### The Aesthetic-Usability Effect

Aesthetically pleasing designs are perceived as more usable and trustworthy. The polished-obsidian aesthetic isn't just visual preference — it's a trust-building mechanism for the Caregiver + Ruler positioning. Visitors who feel they're in a "considered space" are more likely to book a call.

### What "Hands-On Stewardship" Looks Like

- Service descriptions name what's actually delivered (deliverables, not vibes)
- CTAs say "Book a free 30-minute call" not "Get started today"
- No countdown timers, no urgency language, no fake scarcity
- Testimonials with full names + roles, never anonymous
- Real prices (or starting-from prices) visible without filling out a form
- Status toasts for factual states, not persuasion

---

## 16. Cognitive Load Rules

### Content Density

- **Maximum cards per row:** 3 (auto-fit handles this responsively)
- **Maximum items in navigation:** 5–6 top-level links
- **Maximum TOC depth:** 2 levels (H2 + H3). Never nest H4 in navigation
- **Maximum tags displayed:** 6 per article. Use "Show more" beyond that

### Progressive Disclosure

- Service pages start with one-sentence summary + price + outcome — details below
- Article content starts with meta + TOC before diving into prose
- Long articles use H2/H3 hierarchy for scanning before reading
- Code/terminal blocks are self-contained — skippable without losing the narrative
- Pricing details progressive — starting price visible, full breakdown one click away

### Chunking

- Paragraphs separated by `space-4` (24px). No paragraph exceeds ~140 words
- Pull quotes break long prose sections every 3–4 paragraphs
- Visual hairline-rule dividers create distinct content chapters within a page
- Stats are presented in a grid, not inline, for scanability

### Hierarchy Rules

1. **One hero per page.** Never compete for primary attention
2. **One CTA per viewport.** Don't stack multiple calls to action
3. **Emerald used sparingly.** If everything is emerald, nothing is emerald
4. **Animations fire once.** No looping distractions in content areas (only the hero glow loops)

---

## 17. Performance Budget

### Fonts

- **Maximum 3 families** (Libre Bodoni + Inter + JetBrains Mono)
- **Maximum 11 weight/style combinations** total
- Use `font-display: swap` for all Google Fonts imports
- Subset to Latin characters

### Animations & Effects

- **No canvas elements.** (Different from TBB — 2112 has no matrix rain or lightning bolts requiring canvas)
- **Intersection Observer** for all scroll-triggered effects
- **All animations respect `prefers-reduced-motion`**
- **No CSS animations on elements not in viewport** (reveal class prevents unnecessary rendering)

### Images

- All images lazy-loaded (`loading="lazy"`)
- WebP format preferred, with JPEG fallback
- Maximum width: 1180px (wide container)
- Thumbnail/card images: 400px wide maximum
- Hero: prefer typographic compositions over imagery where possible

### CSS

- No external CSS frameworks. All styles custom and purposeful
- CSS custom properties for all tokens
- Backdrop-filter blur limited to header only (GPU-intensive)

### JavaScript

- No frameworks in the design system. Vanilla JS only
- Event listeners use delegation where possible
- IntersectionObserver preferred over scroll listeners

### Target Metrics

- First Contentful Paint: < 1.2s (faster than TBB's 1.5s — fewer effects)
- Cumulative Layout Shift: < 0.05
- Total page weight (uncached): < 400KB (lower than TBB's 500KB — no canvas)
- Font files: < 180KB total

---

## 18. Print Stylesheet

### What Changes
- Background becomes white, all text becomes obsidian
- Emerald accents become dark green or black
- All animations and interactive effects hidden
- Navigation, header, footer: hidden
- Scroll progress bar: hidden
- Cards: simplified to plain bordered boxes
- Images: filter removed, printed in full color
- Code blocks: light gray background with black text
- Links: show URL in parentheses after link text

### What Stays
- Full article content, headings, paragraphs
- Tables (with simplified borders)
- Blockquotes and pull quotes
- Footnotes and references
- Table of contents (as a simple list)

### CSS Media Query

```css
@media print {
  body { background: white; color: black; font-size: 12pt; }
  .site-header, .scroll-progress, canvas, .scroll-indicator { display: none; }
  a { color: black; text-decoration: underline; }
  a::after { content: " (" attr(href) ")"; font-size: 0.8em; }
  pre { border: 1px solid #ccc; background: #f5f5f5; }
  .pull-quote { border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; }
}
```

---

## 19. Stewardship as Design Philosophy

This is not a decorative motif — it's a structural principle. Stewardship is expressed through what the site **chooses to do AND chooses to refuse:**

### Refuses

- **No paywalls.** All Bitcoin / AI / privacy / self-hosting guides are freely accessible
- **No email walls.** You never need to "sign up to continue reading"
- **No tracking analytics.** Cookie banner says "essential cookies only"
- **No dark patterns.** Accept and Decline have equal prominence. No pre-checked boxes.
- **No interstitials.** Content loads and you read it
- **No urgency or scarcity language.** The brand doesn't pressure
- **No discovery-call-only pricing.** Real prices visible upfront
- **No founder-cult of personality.** The firm steward, not the personality. (TBB is the personality channel; 2112 is the institution.)

### Commits

- **Real prices for real services.** Self-custody $100, node setup $500, consulting $100/hr
- **Named testimonials with full attribution.** No "John D." anonymity
- **Source-linked guides.** Every claim traceable
- **Long-form transparency on what each service includes** (deliverables, not vibes)
- **Booking calendar visible without form-gating**

The combination of refusal and commitment IS the stewardship statement. No icon needed.

---

## 20. CSS Custom Properties (Copy-Paste Ready)

```css
:root {
  /* Colors */
  --obsidian: #070707;
  --obsidian-soft: #0c0c0c;
  --obsidian-card: #0e1014;
  --obsidian-elevated: #14161d;
  --obsidian-code: #0a0c10;
  --emerald: #0a5a36;
  --emerald-saturated: #084d2e;
  --emerald-rendered: #08472b;
  --emerald-vibrant: #0c6a3f;
  --emerald-glow: rgba(10, 90, 54, 0.45);
  --emerald-dim: rgba(10, 90, 54, 0.18);
  --emerald-subtle: rgba(10, 90, 54, 0.07);
  --emerald-overlay: rgba(10, 90, 54, 0.04);
  --cream-cousin: #d8d6d0;
  --text-primary: #d8d6d0;
  --text-secondary: #807d75;
  --text-muted: #4f4d47;
  --border-default: rgba(10, 90, 54, 0.10);
  --border-hover: rgba(10, 90, 54, 0.25);
  --border-focus: rgba(10, 90, 54, 0.55);
  --selection-bg: rgba(10, 90, 54, 0.30);

  /* Status */
  --success: #4ADE80;
  --success-dim: rgba(74, 222, 128, 0.1);
  --warning: #FACC15;
  --warning-dim: rgba(250, 204, 21, 0.1);
  --error: #F87171;
  --error-dim: rgba(248, 113, 113, 0.1);
  --info: #60A5FA;
  --info-dim: rgba(96, 165, 250, 0.1);

  /* Typography */
  --font-display: 'Libre Bodoni', 'Bodoni Moda', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
  --space-9: 128px;
  --space-10: 192px;

  /* Layout */
  --content-width: 720px;
  --wide-width: 1180px;
  --page-margin: 32px;

  /* Easing */
  --ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Reference Files

| File | Description |
|---|---|
| `design-complete.html` | Living style guide rendering every component (Phase 2) |
| `logo-spec.html` | Logo + font + color A/B comparison page |
| `Inspiration-images/f2904f8e-7355-4f29-9bf3-38a11189fa7a.png` | Canonical logo reference (AI-generated) |

---

## Versioning

- **1.0** (this draft) — Initial spec, tokens marked OPEN need confirmation. Once confirmed, lock and proceed to Phase 2.
- Future versions track changes here with date + summary.
