# 2112 Capital Solutions — Master Design Guide

**Codename:** Apex Constructivist
**Version:** 2.0 (clean rewrite — Apex Constructivist final spec)
**Last Updated:** 2026-04-30
**Platform:** Astro / GitHub Actions / Hostinger
**URL:** 2112capitalsolutions.com
**Supersedes:** [master-design-guide-archive-2026-04-30.md](master-design-guide-archive-2026-04-30.md) — v1.0–v1.4 hybrid spec containing the superseded Bodoni/emerald editorial direction. Kept for history; not a source of truth.

This document is the binding spec for all design downstream. If the archive disagrees, this document wins.

---

## Decisions Locked

| # | Decision | Locked value | Notes |
|---|---|---|---|
| 1 | Visual register | **Apex Constructivist** | Apex compositional grammar (status bars, classifications, indexed protocols) + Constructivist palette philosophy (heavy red + black + white as a structural triad) |
| 2 | Brand archetype priority | **Ruler primary, Caregiver secondary** | TBB carries Caregiver via personal brand; 2112 projects firm-level authority |
| 3 | Emotional staging | Visual identity locks Ruler-led; content modulates other emotions across page progression | See Journey Staging |
| 4 | Primary accent color | **Signal red `#e63030`** | Single chromatic accent; used sparingly |
| 5 | Type stack | **Space Grotesk + JetBrains Mono** | No serif. No editorial display face. |
| 6 | Logo arrangement | **V14** — vertical 3–4px red bar + left-aligned stacked "2112" + "Capital Solutions" sub | Compact form (bar + 2112 inline) for navbar/footer |
| 7 | Abbreviation policy | No abbreviation | "2112" alone or "2112 Capital Solutions" full |
| 8 | Star ornament | Used subtly as decorative separator only | Status bar separator + footer copyright; never in main wordmark |
| 9 | Sibling relationship to TBB | S2 — Cousin | Share era/spirit, visibly distinct family |
| 10 | Logo customization | Defer fully-proprietary letterform draws | Use AI reference + typeset Space Grotesk/JetBrains Mono until revenue justifies vector budget |
| 11 | Sub-line proportional rule | "Capital Solutions" right edge MUST align with right edge of "2112" at every size where the sub renders; sub dropped at sizes where it cannot fit | See [Logo System → Sub-line Proportional Rule](#sub-line-proportional-rule-binding) |

---

## 1. Identity

### What It Is
A premium private stewardship firm offering hands-on consulting in Bitcoin custody, AI workflow, privacy, and self-hosting. Phased rollout: Bitcoin services lead today; AI, privacy, and self-hosting layer on as client demand materializes. Behind the scenes, 2112 Capital Solutions LLC is also the legal/financial shell for The Bitcoin Breakdown's media operation.

### Personality Spectrum
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

### On the Name "Apex Constructivist"

**Apex** = the compositional grammar (status bars, classifications, indexed protocols, mono labels, technical-document layout — the "we run things" register from Palantir/Anduril/Founders Fund).

**Constructivist** = the color philosophy (heavy red + black + white as a structural triad — the Rodchenko/El Lissitzky tradition that Verso Books, Adbusters, and certain manifesto-coded modern brands inherit).

The pairing is uncommon enough to be ownable. Together it reads as "operationally serious AND ideologically grounded" rather than either alone.

---

## 2. Journey Staging

The visual identity expresses a single dominant emotion. Other emotions emerge through content as the visitor moves through the site. This solves the "styles can't be cleanly mixed" problem — each visual style is a complete system, but content can modulate.

| Stage | Where | Emotions delivered | How |
|---|---|---|---|
| First impression (5 sec) | Hero, header, opening section | Ruler · Reverent · Knowledgeable · Premium · Competence | Visual identity itself — palette, typography, layout primitives |
| Mid-page (30 sec — 2 min) | Services, methodology, principles | Principled · Belonging | Copy and content choices — worldview language, who-this-is-for cues, deliverables that signal seriousness |
| Late-page (3+ min) | Testimonials, case studies, contact | Empowering · Caregiver | Narrative voice — outcomes, warmth in attribution, "we'll bring you along" language, real prices, no funnel friction |

**Implications for design:**
- Hero typography is the loudest expression of authority. No softening.
- Service descriptions can use deliverables lists and procedural language without breaking the register.
- Testimonials and "what to expect" copy can warm the tone without changing visual primitives.
- TBB carries Caregiver at the personal-brand layer. 2112's job is not to *visually* project warmth — it's to *say* the firm has it (testimonials, engagement memos, case studies) without *looking* warm.

---

## 3. Color

### Tokens

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

### Usage Rules
- Pure black surface only. No stone-grain, no radial-gradient noise.
- Signal red is the *only* chromatic color in the entire system. No emerald, no amber, no blue.
- Status colors (success/warn/error/info) only when absolutely required for UX states — and they pair with icon + text + color for WCAG.
- Text-on-black contrast is AAA at primary, AA Large at secondary tiers.

### Status Colors (UX states only)

| Status | Color | Dim | Border |
|---|---|---|---|
| Success | `#4ADE80` | `rgba(74, 222, 128, 0.10)` | `rgba(74, 222, 128, 0.20)` |
| Warning | `#FACC15` | `rgba(250, 204, 21, 0.10)` | `rgba(250, 204, 21, 0.20)` |
| Error | `#F87171` | `rgba(248, 113, 113, 0.10)` | `rgba(248, 113, 113, 0.20)` |
| Info | `#60A5FA` | `rgba(96, 165, 250, 0.10)` | `rgba(96, 165, 250, 0.20)` |

All status indicators must combine **icon + text + color** (never color alone) for WCAG compliance.

### Background Texture

Pure black with a subtle scanline overlay. NOT stone-grain (that was the editorial spec). NOT radial-gradient noise.

```css
body::before {
  content: ''; position: fixed; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg,
    transparent 0, transparent 3px,
    rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px);
}
```

---

## 4. Typography

### Font Families

| Role | Family | License | Weights used |
|---|---|---|---|
| Display + Body | **Space Grotesk** | Free (Google Fonts) | 400, 500, 600, 700 |
| Mono (system, labels, brandmark) | **JetBrains Mono** | Free (Google Fonts) | 400, 500, 600, 700 |

**No serif anywhere.** Space Grotesk is chosen for its Akzidenz-Grotesk lineage — closest free match to Söhne / GT America (the paid Apex-canonical fonts). Reconsider escalating to Söhne / GT America when revenue clears.

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap
```

### Type Scale

| Level | Size | Weight | Spacing | Family | Usage |
|---|---|---|---|---|---|
| Hero H1 | `clamp(48px, 7vw, 84px)` | 700 | -0.035em | Space Grotesk | Page hero only |
| Module H2 | `clamp(40px, 5vw, 64px)` | 700 | -0.03em | Space Grotesk | Section heads |
| H3 / protocol | 24px | 600 | -0.015em | Space Grotesk | Sub-sections, service titles |
| H4 | 18px | 600 | -0.01em | Space Grotesk | Card titles |
| Body | 15px | 400 | 0 | Space Grotesk | Prose paragraphs |
| Mono label | 11px | 600 | 0.20em UPPERCASE | JetBrains Mono | Section labels, classifications |
| Mono caption | 10–12px | 500 | 0.04–0.18em UPPERCASE | JetBrains Mono | Status, meta, footnotes |
| Brandmark | 14–96px | 700 | 0.02em | JetBrains Mono | "2112" wordmark, scaled per V14 system |

### Italics
Rare, never in display moments. The `em` element used in headlines is *normal-style colored signal red*, not italic.

---

## 5. Logo System (V14)

### Primary Mark — vertical bar + stacked wordmark

- 3–4px wide vertical accent bar in signal red `#e63030`
- Bar height matches the cap-height of the "2112" numerals
- "2112" wordmark in JetBrains Mono Bold 700, color `--text`
- "Capital Solutions" sub-line in JetBrains Mono Medium 500, mono UPPERCASE
- Stack alignment: left-aligned to the right of the bar
- Gap between bar and wordmark: scales with mark size (~7–18px)

### Compact Mark — navbar / footer

- Same vertical bar + "2112" wordmark, *inline* horizontal layout
- "Capital Solutions" sub omitted at this size
- 14–18px font size

### Sub-line Proportional Rule (binding)

**The right edge of "Capital Solutions" must align with the right edge of "2112" at every size where the sub is rendered.** This is not an aesthetic preference — it is a structural requirement of the V14 mark.

**Why it matters.** When the sub is wider than the numerals, the mark loses its compositional discipline (the wordmark becomes a body of text, not a stamp). When the sub is narrower than the numerals AND not justified to match, the mark feels orphaned beneath them. Justified-to-numerals is the only state that reads as "same object."

**How it is enforced (CSS pattern).**

```css
.lockup-v14 .stack {
  display: inline-block;
  position: relative;
  padding-bottom: calc(var(--sub-size) * 1.4 + var(--sub-gap));
}
.lockup-v14 .num {
  display: block;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: var(--num-size);
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--text);
}
.lockup-v14 .sub {
  position: absolute;        /* out of flow → stack sizes to .num */
  left: 0;
  bottom: 0;
  width: 100%;               /* fills num width */
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: var(--sub-size);
  text-transform: uppercase;
  color: var(--text-2);
  letter-spacing: 0;          /* let justify add spacing */
  text-align: justify;
  text-align-last: justify;   /* the only line is the last line */
}
```

The `.stack` is `inline-block`; with the sub absolutely positioned, the stack sizes to `.num`'s width. The sub at `width: 100%` then matches that width, and `text-align-last: justify` distributes the letters across it.

**Per-scale sub-size tuning** is required so the sub at zero letter-spacing is *narrower* than the numerals — leaving headroom for justify to add positive spacing. See Scale Behavior below.

### Scale Behavior

| Scale | Num size | Bar (w × h) | Sub size | Sub render | Used for |
|---|---|---|---|---|---|
| Hero | 96px | 6 × 110px | 14px | justified to num width | Hero, marketing landing |
| Section | 64px | 5 × 76px | 11px | justified to num width | Section heads, letterhead |
| Medium | 42px | 4 × 50px | **8px** | justified to num width | Card hero, embed preview |
| Business card | 24px | 3 × 30px | — | **sub dropped** | Card corner, signature |
| Navbar | 18px | 3 × 22px | — | sub dropped | Sticky header |
| Footer | 14px | 2 × 16px | — | sub dropped | Footer signature, meta line |

**Why drop the sub at business card and below.** At 24px numerals, the natural width is ~58px. To physically fit "Capital Solutions" (17 characters in mono), the sub font-size must be ≤5.7px — sub-pixel illegible on most displays. The mark reads stronger as bar + numerals alone than as bar + numerals + unreadable text.

### Favicon Strategy

- **128 × 128 + 64 × 64** — full V14 (bar + 2112) renders cleanly
- **32 × 32** — full V14 still legible; bar at 2px, num at 12px
- **16 × 16** — V14 sub-pixel-fragile. Use **iconic alternate**: bar + "21" only. Single token, hardest to mis-render. Same vertical bar, fewer characters, more recognizable at extreme small.

### Star Ornament

- ★ glyph, signal red, 9–11px, opacity 80–95%
- Used only as decorative separator (status bar between meta items, footer copyright)
- **Never** in the main wordmark or hero composition

### Clear Space

Minimum clear space around any V14 instance = 1× the cap-height of "2112". No element may encroach.

### Reference Files

- [logo-arrangements-apex.html](logo-arrangements-apex.html) — V14 baseline + 19 alternate arrangements (review history)
- [logo-scale-test.html](logo-scale-test.html) — multi-scale proof, every render at actual pixel size

---

## 6. Layout

### Containers

| Container | Max width | Usage |
|---|---|---|
| Outer | 1280px | Full page width |
| Narrow | 760px | Prose articles, forms |
| Reading | 720px | Long-form guides |

### Page Margins
- Desktop: 32px
- Mobile: 24px

### Section Vertical Padding
- 80px (default)
- 40px (mobile)

### Border Radius
- 0 — sharp corners everywhere

### Breakpoints

| Name | Range | Key changes |
|---|---|---|
| Mobile | 0–480px | Single column, stacked buttons, sub omitted in compact V14 |
| Tablet | 481–768px | Nav collapses, 2-column grids, smaller hero |
| Laptop | 769–1024px | Full nav, standard layout |
| Desktop | 1025–1440px | All features active |
| Wide | 1441px+ | Content remains contained, generous margins |

### Grid

Card grids use `repeat(auto-fit, minmax(300px, 1fr))`. Named `.grid--2` and `.grid--3` for fixed-column layouts with mobile collapse to single column.

### Spacing Scale (16px base)

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Icon gaps, tight padding |
| `--space-2` | 8px | Button icon spacing |
| `--space-3` | 16px | Standard padding |
| `--space-4` | 24px | Card padding, paragraph spacing |
| `--space-5` | 32px | Section sub-spacing |
| `--space-6` | 48px | Between related sections |
| `--space-7` | 64px | Footer padding, major breaks |
| `--space-8` | 80px | Module section padding |
| `--space-9` | 128px | Major section separation |
| `--space-10` | 192px | Hero vertical padding |

---

## 7. Components

### Status Bar (top of page)
- Border-bottom: signal red line at 35% opacity (`--signal-line`)
- Mono UPPERCASE, 10.5px, 600 weight
- Layout: `ENTITY ★ JURIS · FY` (with star separator)

### Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--signal` | `#fff` | none | translateY(-1px), darken |
| Ghost | transparent | `--text` | 1px `--line-strong` | border → `--signal` |

- Padding: 16 × 28px (regular), 10 × 16px (small)
- Mono UPPERCASE labels, → arrow suffix on primary
- Sharp corners (0 radius)
- Transitions: 0.15s

### Module Sections

- 80px vertical padding
- Top border: hairline `--line`
- Module classification: signal red mono UPPERCASE with reference numbers (`MODULE 01`)
- Title: 700 weight Space Grotesk

### Protocol Rows (services)

- Three columns: `protocol-id (200px)` / `body` / `spec (240px)`
- Border-top: hairline `--line`
- Protocol ID: 36px mono Bold, signal red
- Spec column: signal red left border, mono UPPERCASE

### Method Steps

- Two columns: `num (200px)` / `body`
- Numbered SEQ.001 → SEQ.005
- Border-top: hairline `--line`

### References Block

- Background: `--bg-card`, hairline `--line` border
- Mono throughout
- Numbered ordered list
- Links: signal red, dotted underline

### Cards

**Service cards:**
- `--bg-card` background, 1px `--line` border
- Eyebrow (11px mono UPPERCASE, `--text-2`)
- Title (24px Space Grotesk 600)
- Excerpt (15px Space Grotesk 400, `--text-2`)
- Hover: border → `--signal-line`, translateY(-2px), shadow `0 12px 32px rgba(230,48,48,0.06)`

**Guide cards:**
- Same as service cards + small category tag at top
- Reading-time meta in mono

### Forms

- Inputs: `--bg-card`, 1px `--line` default border, 14 × 18px padding, 16px Space Grotesk
- Focus: signal red border + 3px `--signal-dim` focus ring
- Sharp corners (0 radius)
- Labels: 11px Space Grotesk 600, 0.18em letter-spacing, UPPERCASE, `--text-2`

### Tables

- Mono UPPERCASE 11px headers with `--signal-line` bottom border
- 16px cell padding
- Hover rows: `--signal-dim` background
- First column emphasized (`--text`, weight 600)

### Tags

- 10px mono UPPERCASE chips
- 1px `--line` border, `--text-2` text, 6 × 14px padding
- Hover: border brightens, text → signal red, subtle fill
- Active: signal red border, signal red text, `--signal-dim` background

### Table of Contents

- Card container with 1px `--line` border
- "In This Article" title (11px mono UPPERCASE `--text-2`)
- Links 15px Space Grotesk, preceded by 12px signal red line that extends to 20px on hover
- Active: signal red text, extended line

### Footer

- Top: 2px signal red border (heavy closure)
- Four-column grid
- All mono UPPERCASE
- Footer-bottom: hairline `--line` border-top, ★ separator in copyright line

### Empty States
Centered: large `--text-3` glyph (48px), 24px Space Grotesk title, 15px `--text-2` description, optional CTA button.

### 404 Page
Giant faded "404" in signal red (up to 160px Space Grotesk 700, 12% opacity). Title overlapping: "This route is unmapped." Description brief. Primary CTA to return home.

### Cookie Banner
Fixed bottom, `--bg-card`, 1px top border. Flex layout: text + accept/decline buttons. Honest language: "This site uses essential cookies only. No tracking, no analytics, no third parties." Accept and Decline have **equal visual prominence**.

### Skeleton Loading
Shimmer lines at various widths (40%, 70%, 90%) in `--bg-elev` with sweeping signal-red-tinted highlight (2s loop).

### Scroll Progress Bar
Fixed top, full width, 1px height. Solid `--signal`. Width = scroll position percentage.

---

## 8. Iconography & Motifs

| Element | Glyph | Purpose |
|---|---|---|
| Bullet | ▸ | Protocol/service list items, signal red |
| Status indicator | ■ | OPERATING flag in mono labels |
| Star | ★ | Album-2112 nod separator (subtle, decorative) |
| Section index | `MODULE 01`, `PROT.001`, `SEQ.001`, `01.01` | Mono UPPERCASE labels |

No icons from icon libraries. Glyphs only, used sparingly. Custom service-line glyphs (Bitcoin, AI, privacy, self-hosting) drawn as 1.5px-stroke SVGs in matching visual register.

---

## 9. Motion

### Easing

| Name | Value | Usage |
|---|---|---|
| Default | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover state changes, button transitions |
| Out | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals (if any), divider transitions |

### Hover Transitions
0.15s default — faster than editorial 0.3s (reads as "responsive" not "considered").

### What 2112 Does NOT Do
- No matrix rain
- No lightning bolt page transitions
- No glitch text on hover
- No scramble effects on titles
- No data-stream tickers
- No hash watermarks
- No nav sparks

These belong to TBB's freedom-and-energy register. 2112's register is steady-and-considered. The absence is the brand statement.

### Reduced Motion
All animations and transitions respect `prefers-reduced-motion: reduce` — durations forced to 0.01ms.

---

## 10. Cursor

Standard browser cursor. Pointer on interactive elements. **No crosshair** (TBB territory).

---

## 11. Voice / Copy Register

### Structural rules
- Direct, technical, declarative
- Sentence case for body; UPPERCASE for mono system labels
- Indexed sections (`MODULE 01`, `PROT.001`, `SEQ.001`)
- Footnoted citations in references block
- "Operator" voice for system content; "considered" voice for engagement-oriented copy (services, methodology, contact)

### Positioning frame (the *what to say*, not just the *how*)

**Empowerment, not opposition.** Detailed in [positioning-notes.md](positioning-notes.md). The full doc is the source of truth; the principles below are the binding short version for any copy decision.

**Default frame:**
- 2112 is **constructive / institutional**. Sister brand TBB carries the cypherpunk-defensive voice. The two voices coexist; they do not blur.
- Privacy + self-hosted infrastructure + private AI are **prudent**, not radical. The pitch is *preparation*, not *prophecy*.
- General-public audience — individuals, families, operating businesses, founders. Not just Bitcoin / privacy maximalists.
- Acknowledge uncertainty about the digital transformation. We don't know how it shakes out; we know what to do regardless.

**Three operative verbs (the brand anchors):**
1. **Thrive** in the great digital transformation
2. **Safeguard** your wealth, your tools, and your time
3. **Don't get left behind**

**Use:**
- Empowerment verbs — *thrive, safeguard, build, protect, run, prepare*
- Concrete consequences — *"safeguard wealth," "don't get left behind"*
- Acknowledged uncertainty — *"the great digital transformation that's coming," "no one knows exactly how this shakes out"*

**Avoid:**
- Defensive / oppositional verbs — *fight, defend, resist, fight back* (TBB territory)
- Anarchist or dystopian framing — *"the system is collapsing," "fight authoritarianism"*
- Survivalist / prepper register — *"when the lights go out," "be ready when the music stops"*
- Wellness-coach softness — *"unlock," "embrace," "your sovereignty journey"*

The visual register (Apex Constructivist — black + signal red, mono labels, classified-document layout) holds the edge so the copy doesn't have to. Soft-drift is the failure mode; the verbs above guard against it.

---

## 12. Photography Treatment

### Filter
- Heavy desaturation: `grayscale(70%) contrast(1.10) brightness(0.85)`
- Optional signal-red tint overlay: `linear-gradient(135deg, rgba(230,48,48,0.10), rgba(0,0,0,0.20))` with `mix-blend-mode: overlay`
- Hover: grayscale reduces to 30%, brightness +5%
- Captions: 11px JetBrains Mono UPPERCASE, `--text-3`, 0.18em letter-spacing

### Subject Matter
- Architectural interiors (private libraries, panelled rooms, hallways)
- Hands engaged in considered work (note-taking, hardware setup, signing documents)
- Material objects (hardware wallets shot like jewelry, books, brass plates, steel plates for seed backups)
- **Never:** stock crypto-bro imagery, candlestick charts, lambos, Bitcoin coin renders, military hardware

---

## 13. Accessibility

### Focus States
- 2px solid signal red outline, 3px offset, 0px border-radius
- Selector: `:focus-visible` only (no outline on mouse click)

### Skip Link
Hidden off-screen by default. Appears at top-left on Tab keypress: signal red background, `#fff` text, 8 × 20px padding, 13px UPPERCASE with 2px letter-spacing.

### Color Independence
All status states (success, error, warning, info) combine icon + text + color. Color is never the sole indicator.

### Touch Targets
Recommended minimum: 44 × 44px. Absolute minimum: 32 × 32px.

### Contrast Ratios

| Pair | Ratio | WCAG |
|---|---|---|
| `--text` `#f4f4f0` on `--bg` `#000` | 19.8 : 1 | AAA |
| `--text-2` `#908d85` on `--bg` | 6.6 : 1 | AAA Small + AA Large |
| `--text-3` `#5a5752` on `--bg` | 3.4 : 1 | AA Large only — never use for body text |
| `--signal` `#e63030` on `--bg` | 4.7 : 1 | AA — usable for large text and UI accents |
| `#fff` on `--signal` (button) | 4.4 : 1 | AA — usable for primary button text |

---

## 14. Gestalt Principles (Codified)

### Proximity
- Cards within the same section: 24px gaps
- Sections separated by 80px padding
- Related meta (date · reading time · category): 24px gaps with `·` separators
- Unrelated sections: hairline-rule dividers

### Similarity
- **Signal red = interactive or critical.** Anything red can be clicked, hovered, or signals state
- **Paper white `#f4f4f0` = readable.** Primary text is for reading, not interacting
- **Mono = system / data.** JetBrains Mono signals technical, machine-generated, or numerical content
- **Space Grotesk Bold = brand voice.** Display weight signals "this is the institution speaking"

### Continuity
- Eye flow: classification (mono UPPERCASE) → headline (Space Grotesk 700) → body (Space Grotesk 400) → CTA → cards
- Signal red accents create a visual thread that guides scanning
- Hairline rules signal "structural break" without disrupting flow

### Figure-Ground
- Pure black background pushes content forward
- Cards use `--bg-card` (`#111`) — barely distinguishable but perceptually "elevated"
- Signal red elements are always foreground; never recede
- Hover states amplify figure-ground (subtle lift + shadow)

### Closure
- Card borders restrained at rest — reader's brain completes the rectangle from content alignment
- Hairline rules can be partial — eye completes them

---

## 15. Semiotics

### Color as Symbol

| Element | Symbolism |
|---|---|
| **Signal red** (`#e63030`) | Operational authority, classification stamp, structural element. Constructivist heritage — Rodchenko/Lissitzky used red as a structural element, not decoration. Red here says "this is the firm speaking, and what it says is binding." |
| **Pure black** (`#000`) | Discretion, weight, the surface that records. Pure black (not soft black) signals "no compromise, no warmth-leaning"; aligns with the Apex/operational register. |
| **Paper white** (`#f4f4f0`) | Slightly warm to avoid clinical-coldness. The single softening token in an otherwise hard system. |

### Typography as Symbol

| Element | Symbolism |
|---|---|
| **Space Grotesk Bold** | Modern competence with industrial heritage (Akzidenz-Grotesk lineage). Bold weight at large size = institutional speaking voice. |
| **JetBrains Mono** | System and proof. Mono is reserved for things that must be exact: prices, addresses, code, dates, classification labels. Its presence signals "this is precise." |

### Motif as Symbol (sparingly)

| Motif | Symbolism |
|---|---|
| **Vertical red bar** (V14 logo) | Structural-element heritage from Constructivism. Reads as compositional grammar (frame, partition, classification stamp) rather than as a symbol-mark. The unusual choice in the consulting category is itself a positioning statement: 2112 is in the Verso/Adbusters/Constructivist tradition, not the Goldman/Citadel tradition. |
| **Scanlines** | Operational surface — readout, classified document, terminal capture. Subtle, never dominant. |
| **Star** (★) | Album-2112 nod. Decorative-separator-only role; never in primary mark. |

What's deliberately absent: lightning bolts, hexagonal patterns, B-coin logos, gold accents, Roman columns, circuit-board traces, glitch effects.

---

## 16. Trust Signals & Emotional Design

### Visual Credibility Cues
- No stock photography. All imagery treated for unified register
- Typography signals seriousness (Space Grotesk 700 at large sizes)
- Generous whitespace — premium brands use it to signal that content doesn't need to compete
- Equal-prominence Accept/Decline on cookie banner — no dark patterns
- Real prices visible on services page — no discovery-call funnel
- No ads, no pop-ups, no email gates

### What "Hands-On Stewardship" Looks Like
- Service descriptions name what's actually delivered (deliverables, not vibes)
- CTAs say "Book a free 30-minute call" not "Get started today"
- No countdown timers, no urgency language, no fake scarcity
- Testimonials with full names + roles, never anonymous
- Real prices (or starting-from prices) visible without filling out a form
- Status toasts for factual states, not persuasion

---

## 17. Cognitive Load Rules

### Content Density
- Maximum cards per row: 3
- Maximum items in navigation: 5–6 top-level links
- Maximum TOC depth: 2 levels (H2 + H3)
- Maximum tags displayed: 6 per article. "Show more" beyond that

### Progressive Disclosure
- Service pages start with one-sentence summary + price + outcome — details below
- Article content starts with meta + TOC before diving into prose
- Long articles use H2/H3 hierarchy for scanning before reading
- Code/terminal blocks self-contained — skippable without losing the narrative

### Hierarchy Rules
1. **One hero per page.** Never compete for primary attention
2. **One CTA per viewport.** Don't stack multiple calls to action
3. **Signal red used sparingly.** If everything is red, nothing is red
4. **Animations fire once.** No looping distractions in content areas

---

## 18. Performance Budget

### Fonts
- 2 families (Space Grotesk + JetBrains Mono) — half of editorial spec
- Maximum 8 weight/style combinations total
- `font-display: swap` for all imports
- Subset to Latin characters

### Animations & Effects
- No canvas elements
- Intersection Observer for any scroll-triggered effects
- All animations respect `prefers-reduced-motion`
- No CSS animations on elements not in viewport

### Images
- Lazy-loaded (`loading="lazy"`)
- WebP format preferred, JPEG fallback
- Maximum width: 1280px
- Thumbnails: 400px max
- Hero: prefer typographic compositions over imagery where possible

### CSS / JS
- No external CSS frameworks. All styles custom and purposeful
- CSS custom properties for all tokens
- Vanilla JS only — no frameworks in the design system
- Backdrop-filter blur limited to header only

### Target Metrics
- First Contentful Paint: < 1.0s
- Cumulative Layout Shift: < 0.05
- Total page weight (uncached): < 350KB
- Font files: < 160KB total

---

## 19. Print Stylesheet

### What Changes
- Background → white, all text → black
- Signal red → dark red `#8a0000` for accents, solid black for body content
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

### CSS

```css
@media print {
  body { background: white; color: black; font-size: 12pt; }
  .site-header, .scroll-progress, .scroll-indicator { display: none; }
  a { color: black; text-decoration: underline; }
  a::after { content: " (" attr(href) ")"; font-size: 0.8em; }
  pre { border: 1px solid #ccc; background: #f5f5f5; }
}
```

---

## 20. Stewardship as Design Philosophy

This is not a decorative motif — it's a structural principle. Stewardship is expressed through what the site **chooses to do AND chooses to refuse:**

### Refuses
- **No paywalls.** All Bitcoin / AI / privacy / self-hosting guides are freely accessible
- **No email walls.** Never "sign up to continue reading"
- **No tracking analytics.** Cookie banner says "essential cookies only"
- **No dark patterns.** Accept and Decline have equal prominence. No pre-checked boxes.
- **No interstitials.** Content loads and you read it
- **No urgency or scarcity language.** The brand doesn't pressure
- **No discovery-call-only pricing.** Real prices visible upfront
- **No founder-cult of personality.** The firm steward, not the personality. (TBB is the personality channel; 2112 is the institution.)

### Commits
- Real prices for real services (current model: confirm against services page)
- Named testimonials with full attribution. No "John D." anonymity
- Source-linked guides. Every claim traceable
- Long-form transparency on service deliverables
- Booking calendar visible without form-gating

The combination of refusal and commitment IS the stewardship statement. No icon needed.

---

## 21. CSS Custom Properties (copy-paste ready)

```css
:root {
  /* Colors */
  --bg: #000000;
  --bg-elev: #0a0a0a;
  --bg-card: #111111;
  --text: #f4f4f0;
  --text-2: #908d85;
  --text-3: #5a5752;
  --line: rgba(255,255,255,0.10);
  --line-strong: rgba(255,255,255,0.22);
  --signal: #e63030;
  --signal-dim: rgba(230, 48, 48, 0.15);
  --signal-line: rgba(230, 48, 48, 0.35);

  /* Status (UX states only) */
  --success: #4ADE80;
  --warning: #FACC15;
  --error: #F87171;
  --info: #60A5FA;

  /* Typography */
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 80px;
  --space-9: 128px;
  --space-10: 192px;

  /* Layout */
  --container-outer: 1280px;
  --container-narrow: 760px;
  --container-reading: 720px;
  --page-margin: 32px;
  --section-pad: 80px;

  /* Easing */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 22. Reference Files

| File | Description |
|---|---|
| [sample-apex-modernist.html](sample-apex-modernist.html) | Reference homepage — locked spec rendered live. Filename retained from earlier "Apex Modernist" naming; content is current Apex Constructivist v2.0. |
| [logo-arrangements-apex.html](logo-arrangements-apex.html) | V14 baseline + 19 alternate arrangements (review history) |
| [logo-scale-test.html](logo-scale-test.html) | Multi-scale proof — every render at actual pixel size. Demonstrates Sub-line Proportional Rule. |
| [design-complete.html](design-complete.html) | Living style guide / brand kit — every token, every component, every state rendered live in v2.0 register. |
| [logo-precedent-research.md](logo-precedent-research.md) | Research report on V14 logo precedents (bar+numerals), Constructivist heritage anchors, and brand-territory risk. **Contains the Twenty One Capital (NYSE: XXI) finding** — read before V14 ships externally. |
| [design-complete-archive-2026-05-01.html](design-complete-archive-2026-05-01.html) | Pre-retrofit kit (legacy Bodoni/emerald spec). Kept for history. |
| [master-design-guide-archive-2026-04-30.md](master-design-guide-archive-2026-04-30.md) | Previous spec (v1.0–v1.4 hybrid). Kept for history. Not a source of truth. |

---

## Versioning

- **2.0** (2026-04-30) — Clean rewrite. Apex Constructivist final spec. Drops all Bodoni/emerald content from prior versions. Adds binding Sub-line Proportional Rule for V14 logo. Archives previous document as `master-design-guide-archive-2026-04-30.md`.
