# 2112 Website -- Worklog

> Tracks development of 2112capitalsolutions.com. Sub-project of the Ai Playground workspace; has its own GitHub repo and its own deploy pipeline.

## Last Sessions

### [2112-website] 2026-05-02

**Guide migration pipeline started. First real guide (SSH into your Bitcoin node) consolidated from 7-file course into single guide, live at /guides/. Favicon shipped (V14 path-based). Scroll-offset and H4 styling fixes. TESS search confirmed clean.**

- Consolidated `TBB/Content/node-ssh/` (7 files, ~1,088 lines) into single guide `ssh-into-your-bitcoin-node.md` with proper 2112 frontmatter (title, description, pubDate, category: Bitcoin, level: Beginner, readingTime: 45 min). Light structural adaptation: H1s→H2s, "course"→"guide", course outline→anchor-linked ToC, inter-lesson refs→section refs. Voice/content unchanged — already fits 2112 empowerment frame.
- Removed sample guides (hardware-wallet-setup.md, local-ai-on-your-machine.md) from content collection. Deleted archive/ dir to avoid glob pickup.
- Favicon: replaced text-based SVG (font-dependent, broken) with path-based geometric "21" + red bar. Renders consistently across all systems.
- CSS: added `scroll-margin-top: 80px` to H2/H3/H4 in `.article-prose` to clear sticky header on anchor jumps. Added H4 styling (17px, semi-bold) for sub-subsections.
- Marked TESS search complete in TODO.md and WORKLOG.md (user confirmed no conflicts found).
- Build verified clean: 7 pages, 3.17s. Guide renders correctly in browser — anchor links, code blocks, tables, checklist all working.
- Planned full guide migration: 8 guides found across TBB/FreedomLab/OpenClaw. Phase 2 (single-file guides: PhoenixD, Nunchuk, Bitrefill) ready to execute. Phase 3 (multi-part: OpenClaw 12-module course, How to Learn) needs courses collection decision.
- PGP keypair plan written (GPG4Win, 4096-bit, annual rotation). Domain email evaluated — Proton Mail recommended for brand alignment. OG image prompt provided.

## Status

- **Live at 2112capitalsolutions.com** — all routes deployed, mobile + desktop tested
- Brand identity v2.0 (Apex Constructivist) locked
- First real guide live: "SSH into your Bitcoin node" (45 min, ~1,050 lines) at `/guides/ssh-into-your-bitcoin-node/`
- Favicon: V14 path-based geometric "21" + red bar (font-independent)
- Guide migration pipeline planned: 3 single-file guides ready (Phase 2), 3 multi-part courses need architecture decision (Phase 3)
- Copy still placeholder-but-shippable on static pages — user iterating in passes
- Deferred production items in TODO.md: PGP, OG image, domain email, photography, testimonials

## Next / To-Do

- [ ] Migrate Phase 2 guides: PhoenixD Lightning (873 lines), Nunchuk walkthrough (241 lines), Bitrefill/Buy with Bitcoin (129 lines)
- [ ] Decide Phase 3 approach: OpenClaw 12-module course + How to Learn — courses collection vs. consolidated mega-guides
- [ ] User-driven copy pass: replace remaining placeholder copy with founder voice (services / methodology / about / contact)
- [ ] Generate PGP keypair (4096-bit) for `thebitcoinbreakdown@gmail.com`; publish fingerprint on contact page
- [ ] Open Graph default image (1200x630 V14 social card) — currently references missing `/og-default.png`
- [ ] Set up `hello@2112capitalsolutions.com` MX via Proton Mail — replace TBB gmail when ready
- [ ] Real testimonials when available — collect 3-5 named, then add to about / homepage
- [ ] Photography direction (architectural interiors / hands-working — never military hardware) once treatment is ready
- [ ] Optionally clean up orphaned WP files via FTP wipe script (low priority — they don't serve)
- [ ] Revisit paid Sohne / GT America license once revenue clears
- [x] USPTO TESS search for `2112 Capital` / `2112 Capital Solutions` — no conflicts found (done 2026-05-02)
- [x] Favicon: V14 iconic alternate (bar + 21) — path-based SVG, verified in browser (done 2026-05-02)

## Decisions

<!-- protected: append-only -->

- **2026-04-26** -- Repo will be public. Site will publish Bitcoin consulting guides; nothing in the codebase is sensitive. Private business material gets a separate private repo if needed later.
- **2026-04-26** -- Mirror TBB's pipeline rather than choose a different stack. Astro + GitHub Actions + Hostinger FTP is known-working; no need to evaluate alternatives.
- **2026-04-26** -- Delete the old WordPress install rather than override it with a custom `.htaccess`. Cleaner, removes attack surface from unpatched WP. Full backup taken first. *(Superseded 2026-04-30 — `.htaccess` override approach won; WP files remain as inert orphans but don't serve.)*
- **2026-04-26** -- Extracted WordPress content is reference-only, not a direct port. Pricing data is from 2023 and outdated; the redesign may want different information architecture.
- **2026-04-26** -- Workflow `server-dir` is `/public_html/`, not `/domains/2112capitalsolutions.com/public_html/`. The per-domain Hostinger FTP user is sandboxed to its domain's directory.
- **2026-04-26** -- Confirmed via deploy: our files at `/public_html/` are reachable at `https://2112capitalsolutions.com/<filename>`, and TBB at thebitcoinbreakdown.com is unaffected. Per-domain FTP sandboxing works as expected.
- **2026-04-26** -- WordPress wipe planned manually via Hostinger File Manager. *(Superseded 2026-04-30 — `.htaccess` override solved it without manual wipe.)*
- **2026-04-30** -- WordPress wipe handled via `.htaccess` override (DirectoryIndex + RewriteRule). Single deploy push (commit `c3e41c4`) replaced WP at root. WP files remain on disk as orphans but don't serve.
- **2026-04-30** -- Brand archetype priority: **Ruler primary, Caregiver secondary** (flipped from original Caregiver-primary). TBB carries Caregiver via personal brand; 2112 institutional brand projects authority. Solves the multi-brand emotional architecture: personal-brand and institutional-brand operate in different registers.
- **2026-04-30** -- Emotional staging across user journey: visual identity locks Ruler-led; content modulates other emotions (Principled, Belonging, Empowering, Caregiver) through page progression. Visual = constant; content = relationship-builder. Solves the "styles can't be mixed" problem.
- **2026-04-30** -- Visual register: **Apex Constructivist** — Apex compositional grammar (status bars, classifications, indexed protocols, mono labels, technical-document layout) + Constructivist palette philosophy (heavy red + black + white as structural triad). Distinct from pure Apex (Anduril/Palantir use red sparingly) and pure Manifesto (Verso/Adbusters lack the operational grammar).
- **2026-04-30** -- Primary accent color: **signal red `#e63030`** (over emerald `#0a5a36`). Emerald variant tested; lost operational authority. Red preserves album-2112 star reference coherence.
- **2026-04-30** -- Type stack: **Space Grotesk + JetBrains Mono** (free Söhne/GT America substitute). No serif anywhere. Libre Bodoni / editorial Didone direction superseded.
- **2026-04-30** -- Logo arrangement: **V14** — vertical 3-4px red bar + left-aligned stacked "2112" wordmark (JetBrains Mono Bold) + "Capital Solutions" sub-line. Compact form (bar + 2112 inline) for navbar/footer.
- **2026-04-30** -- Abbreviation policy: No abbreviation. "2112" alone or "2112 Capital Solutions" full. CAP_SOL, snake_case, kebab-case variants rejected — too cold for non-technical clients.
- **2026-04-30** -- Star ornament (album-2112 nod): Used subtly as decorative separator only (status bar between meta items, footer copyright). ~9-11px, signal red, 80-95% opacity. Never in main wordmark.
- **2026-04-30** -- Sibling relationship to TBB: **S2 — Cousin**. Share era/spirit, visibly distinct family. Third tone for non-Apex contexts: cool greige `#d8d6d0`.
- **2026-04-30** -- Logo customization: Defer fully-proprietary letterform draws; use AI reference image plus typeset Space Grotesk/JetBrains Mono as canonical mark for now. Revisit when revenue justifies vector-design budget.
- **2026-05-01** -- Sub-line proportional rule (V14): "Capital Solutions" right edge MUST align flush with "2112" right edge at every size, distributed via per-scale `--sub-track` letter-spacing tokens. Sub dropped at sizes where it cannot fit (business card and below). Codified in `master-design-guide.md` Decision 11.
- **2026-05-01** -- Site architecture: 5 main pages + guides content collection + dynamic article template. Mobile hamburger drawer at ≤720px. Homepage hero entrance animation ~2.4s staggered cascade (V14 cascade → h1 → tagline → service list → modules below). Honors `prefers-reduced-motion`.
- **2026-05-01** -- Sales CTAs (`Schedule a call` / `Schedule consult` / `Schedule intake`) removed site-wide. Contact reachable only via nav link + footer email. Per user — minimalist, no funnel-coded language.
- **2026-05-01** -- Email canonical: `thebitcoinbreakdown@gmail.com` (TBB inbox) until `hello@2112capitalsolutions.com` MX is set up. Used in BaseLayout, Footer, Contact form action, and all guide CTAs.
- **2026-05-01** -- Service list (homepage hero): 8 items, ordered foundation → bitcoin → privacy/AI → education. `SELF-HOSTED INFRA · NODE OPERATIONS · BTC CUSTODY · ACCESS TO THE BITCOIN ECONOMY · PRIVACY STACK · OPEN SOURCE AI · AGENTIC OPERATING SYSTEMS · FREEDOM TECH EDUCATION`.
- **2026-05-01** -- Brand voice (positioning frame): **empowerment, not opposition**. 2112 = constructive / institutional voice; sister brand TBB carries cypherpunk / defensive voice. Three operative verbs: **thrive · safeguard · don't get left behind**. Audience is the general public — not Bitcoin / privacy maximalists. Privacy framed as prudent, not radical. Captured in `brand/positioning-notes.md` and `master-design-guide.md § 11`.

## Reference IDs

<!-- protected: append-only -->

- **GitHub repo:** https://github.com/TheBitcoinBreakdown-95/2112capitalsolutions.com
- **Domain:** 2112capitalsolutions.com (Hostinger, same account as TBB)
- **Project directory:** `2112-website/` (under TBB workspace, separate git repo)
- **Astro project root:** `2112-website/astro/`
- **Deploy workflow:** [.github/workflows/deploy.yml](.github/workflows/deploy.yml) -- auto-runs on push to `main`
- **GitHub Actions secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (set via `gh secret set`; values never logged)
- **Hostinger FTP password scope:** account-wide -- shared between TBB and 2112; rotating it requires updating both repos' secrets
- **Backup location (gitignored):** `Old-site-backup/` -- contains `public_html/`, `public_html.zip` (322 MB), `2112.WordPress.2026-04-26.xml`, `extract.py`, and `extracted-content/`
- **LLC info reference:** [tbb-media-company/the-bitcoin-breakdown-old/2112-old/](../tbb-media-company/the-bitcoin-breakdown-old/2112-old/) -- formation docs, branding, services notes
- **Brand design files:** `2112-website/brand/` -- master-design-guide.md (binding spec, v2.0), positioning-notes.md (voice + frame), logo-precedent-research.md (V14 precedents + XXI risk), sample-apex-modernist.html (homepage reference), logo-arrangements-apex.html (V14 + 19 alts), logo-scale-test.html (multi-scale proof), design-complete.html (living style guide kit), visual-styles-research.md (35-style spread), logo-spec.html (font A/B), and dated archives.
- **Inspiration / archive:** `2112-website/Inspiration-images/` (heritage logos + AI-generated lockups), `2112-website/design-exploration/archive/` (V1-V10 + index — superseded by Apex Constructivist direction)
- **Production contact email:** `thebitcoinbreakdown@gmail.com` (current); `hello@2112capitalsolutions.com` MX deferred to TODO.md
- **Project memory references:** `project_2112_positioning.md` (empowerment frame); `feedback_act_dont_ask.md` (act-don't-ask preference)
- **Deferred-production checklist:** `2112-website/TODO.md`

## Session History

<!-- append-only, auto-managed by save protocol -->

### 2026-05-01 [2112-website] — Site built end-to-end and deployed

- Built full Astro site: 5 main pages + guides content collection + dynamic article template. 8 routes, ~2.6s build, ~30s deploy via GitHub Actions to Hostinger.
- Hero: V14 lockup, h1/tagline/8-item service list, staggered entrance animation ~2.4s, honors `prefers-reduced-motion`.
- Mobile: hamburger drawer at <=720px, scroll-fade brandmark, aggressive vertical-rhythm trim.
- Copy purge: removed all "consult"/"consultation"/"boutique consulting firm"/"founded 2023"/Schedule-a-call CTAs. Email switched to TBB gmail site-wide.
- About page rewrite with original WP mission language + user's verbatim positioning sentence + APPROACH section.
- Positioning locked: **empowerment, not opposition**. Three operative verbs: thrive / safeguard / don't get left behind.
- New brand-folder docs: positioning-notes.md, logo-precedent-research.md, design-complete archive, TODO.md.
- 9 commits (746302a to 549ea18), all deployed green.

### 2026-04-30 — Brand identity v1.4 + WordPress wipe automation

- Shipped `.htaccess` override to kill WP at `/`; live site now serves Astro placeholder (commit `c3e41c4`)
- Locked emotional brief: **Ruler primary** + Caregiver secondary
- Locked visual register: **Apex Constructivist** — Apex compositional grammar + Constructivist palette philosophy. Renamed mid-session from "Apex Modernist" for accuracy.
- Locked color: **signal red `#e63030`** over emerald `#0a5a36`
- Locked type: **Space Grotesk + JetBrains Mono**. Bodoni-led editorial direction superseded.
- Locked logo: **V14** — vertical red bar + left-aligned stacked "2112" + "Capital Solutions" sub. Holds down to 32px.
- Album-2112 red star reintroduced subtly (status bar + footer copyright separators only)
- "CAP_SOL" abbreviation rejected
- Master design guide updated through v1.4 with 11 locked decisions and full token specification
- Built reference files in `brand/`: master-design-guide.md, sample-apex-modernist.html, logo-arrangements-apex.html, logo-scale-test.html, visual-styles-research.md
- Honest reframe after user pushback: not 1:1 Anduril/Palantir clone; closer to Verso Books / Adbusters / Constructivist tradition

### 2026-04-26 — Initial setup + first successful deploy to correct path

- Scaffolded Astro project at `astro/` with placeholder index page; local build verified
- Created public GitHub repo: https://github.com/TheBitcoinBreakdown-95/2112capitalsolutions.com
- Set all 3 GitHub Actions FTP secrets via `gh secret set`
- First deploy landed in nested orphan path due to stale `server-dir` value
- Corrected `server-dir` to `/public_html/` (commit `02e45d8`); pushed
- Second deploy ran green: 4 files uploaded in 239ms, TBB unaffected
- WordPress homepage still wins `/` route until WP files are removed
- Backed up live WordPress site (322 MB files + WXR XML)
- Extracted 8 WP pages/posts to markdown via pandoc for redesign reference
