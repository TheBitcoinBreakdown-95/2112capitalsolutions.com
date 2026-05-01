# 2112 Website -- Worklog

> Tracks development of 2112capitalsolutions.com. Sub-project of the Ai Playground workspace; has its own GitHub repo and its own deploy pipeline.

## Last Session

**2026-04-30** -- Brand identity and design system foundation locked. Apex Constructivist visual register, V14 logo, signal red accent. WordPress wipe automated.

- Shipped `.htaccess` override to kill WP at `/`; live site now serves Astro placeholder (commit `c3e41c4`)
- Locked emotional brief: **Ruler primary** + Caregiver secondary (flipped from original — TBB carries personal-brand Caregiver, 2112 projects institutional authority); Empowering + Reverent temperature; Principled · Premium · Knowledgeable as keywords
- Locked visual register: **Apex Constructivist** — Apex compositional grammar (status bars, classifications, indexed protocols) + Constructivist palette philosophy (heavy red + black + white as structural triad). Renamed mid-session from "Apex Modernist" for accuracy.
- Locked color: **signal red `#e63030`** (over emerald `#0a5a36` — emerald variant tested via `sample-apex-modernist-emerald.html`, lost operational authority)
- Locked type: **Space Grotesk + JetBrains Mono**. No serif anywhere. Bodoni-led editorial direction superseded.
- Locked logo: **V14** — vertical red bar + left-aligned stacked "2112" + "Capital Solutions" sub. Holds down to 32px; 16px favicon may need iconic alternate
- Album-2112 red star reintroduced subtly (status bar + footer copyright separators only)
- "CAP_SOL" abbreviation rejected; "2112" or "2112 Capital Solutions" only
- Master design guide updated through v1.4 with 11 locked decisions and full token specification
- Built reference files in `brand/`: master-design-guide.md, sample-apex-modernist.html (homepage reference), logo-arrangements-apex.html (V14 + 19 alts), logo-scale-test.html (multi-scale proof), visual-styles-research.md (35-style spread)
- Honest reframe after user pushback: not 1:1 Anduril/Palantir clone (they use red sparingly); closer to Verso Books / Adbusters / Constructivist tradition in color philosophy

## Status

- Live site at 2112capitalsolutions.com now serves Astro placeholder (WP killed via `.htaccess` override)
- Brand identity v1.4 locked: Apex Constructivist register, V14 logo, signal red `#e63030`, Space Grotesk + JetBrains Mono
- Design foundation in `brand/`: binding spec (master-design-guide.md), reference homepage, logo-scale proof, 35-style research, 20-variant logo exploration
- `design-complete.html` still renders the OLD Bodoni-led editorial spec — needs retrofit to v1.4 tokens (next session priority)
- Astro pages not yet built; homepage/services/about/guides/contact all pending page-level work
- Older design exploration archived in `design-exploration/archive/` (V1-V10 + index)

## Next / To-Do

- [x] Commit workflow path fix + `.gitignore` update + WORKLOG (commit `02e45d8`, pushed)
- [x] Push and verify deploy hits correct path
- [x] Wipe WordPress files (replaced by `.htaccess` override approach — commit `c3e41c4`. Manual file-manager wipe no longer needed; WP files remain on disk as orphans but don't serve.)
- [x] Hard-refresh https://2112capitalsolutions.com/ and verify placeholder loads
- [x] Begin redesign: information architecture, copy direction, visual identity (brand identity locked v1.4)
- [ ] Pull useful content from `Old-site-backup/extracted-content/` into new site as starter copy
- [ ] **Retrofit `design-complete.html` to Apex Constructivist v1.4 tokens** (brand-kit page rewrite — next session priority)
- [ ] Build homepage Astro page assembled from locked tokens
- [ ] Build services page
- [ ] Build guides hub + individual guide article template
- [ ] Build about page
- [ ] Build contact page
- [ ] Update `astro/src/styles/global.css` with v1.4 design tokens
- [ ] Test V14 logo at 16px favicon size; create iconic alternate if illegible
- [ ] Decide photography direction (architectural interiors / hands working / no military hardware imagery)
- [ ] Optionally clean up orphaned WP files via FTP wipe script (low priority — they don't serve)
- [ ] Consider paid Söhne / GT America license to upgrade from free Space Grotesk substitute (revisit when revenue clears)

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
- **Brand design files:** `2112-website/brand/` -- master-design-guide.md (binding spec, v1.4), sample-apex-modernist.html (reference homepage), sample-apex-modernist-emerald.html (deprecated), logo-arrangements-apex.html (V14 + 19 alts), logo-scale-test.html (multi-scale proof), visual-styles-research.md (35-style spread), design-complete.html (legacy editorial spec, retrofit pending), logo-spec.html (font A/B reference)
- **Inspiration / archive:** `2112-website/Inspiration-images/` (heritage logos + AI-generated lockups), `2112-website/design-exploration/archive/` (V1-V10 + index — superseded by Apex Constructivist direction)

## Session History

<!-- append-only, auto-managed by save protocol -->

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
