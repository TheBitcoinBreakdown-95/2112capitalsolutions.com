# 2112 Website -- Worklog

> Tracks development of 2112capitalsolutions.com. Sub-project of the Ai Playground workspace; has its own GitHub repo and its own deploy pipeline.

## Last Session

**2026-04-26** -- Initial setup. Mirrored TBB's pipeline (Astro + GitHub Actions auto-deploy via FTP to Hostinger).

- Scaffolded Astro project at [astro/](astro/) with placeholder index page; build verified locally
- Created public GitHub repo: https://github.com/TheBitcoinBreakdown-95/2112capitalsolutions.com
- Configured all 3 GitHub Actions secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`)
- First deploy ran green but landed in a nested orphan path -- the workflow's `server-dir` was committed before being corrected to `/public_html/`. Fix is in working tree, uncommitted.
- Backed up the live WordPress site (files + WXR content export) to [Old-site-backup/](Old-site-backup/), gitignored
- Extracted 8 WP pages/posts to markdown via pandoc (in [Old-site-backup/extracted-content/](Old-site-backup/extracted-content/)) for reference during redesign

## Status

- Local Astro scaffold builds clean (`npm run build` verified, ~1.7s)
- GitHub repo live, `main` branch tracking, public visibility
- FTP secrets present in GitHub Actions (verified via `gh secret list`)
- Live site at 2112capitalsolutions.com still serves the OLD WordPress install -- our deploy went to a wrong path, didn't overwrite anything
- Workflow path fix and gitignore update are **modified, uncommitted, unpushed**
- Backup is complete: WP files (322 MB zip), WXR XML, and 8 extracted markdown files

## Next / To-Do

- [ ] Commit workflow path fix + `.gitignore` update + this WORKLOG
- [ ] Push to `main` (deploy will trigger and land in same orphan path -- still no visible change at the live URL)
- [ ] Wipe `/public_html/` via Hostinger File Manager to remove the old WordPress install
- [ ] Trigger redeploy (empty commit or trivial change to `main`)
- [ ] Verify placeholder loads at https://2112capitalsolutions.com/
- [ ] Begin redesign: information architecture (Services and Pricing might merge), copy direction, visual identity
- [ ] Pull useful content from `Old-site-backup/extracted-content/` into new site as starter copy where it fits

## Decisions

<!-- protected: append-only -->

- **2026-04-26** -- Repo will be public. Site will publish Bitcoin consulting guides; nothing in the codebase is sensitive. Private business material gets a separate private repo if needed later.
- **2026-04-26** -- Mirror TBB's pipeline rather than choose a different stack. Astro + GitHub Actions + Hostinger FTP is known-working; no need to evaluate alternatives.
- **2026-04-26** -- Delete the old WordPress install rather than override it with a custom `.htaccess`. Cleaner, removes attack surface from unpatched WP. Full backup taken first.
- **2026-04-26** -- Extracted WordPress content is reference-only, not a direct port. Pricing data is from 2023 and outdated; the redesign may want different information architecture.
- **2026-04-26** -- Workflow `server-dir` is `/public_html/`, not `/domains/2112capitalsolutions.com/public_html/`. The per-domain Hostinger FTP user is sandboxed to its domain's directory, so `/public_html/` resolves to the correct web root from the FTP user's perspective.

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
- **LLC info reference:** [tbb-media-company/the-bitcoin-breakdown-old/2112-old/](../tbb-media-company/the-bitcoin-breakdown-old/2112-old/) -- formation docs, branding, services notes (in TBB workspace, not this repo)

## Session History

<!-- append-only, auto-managed by save protocol -->
