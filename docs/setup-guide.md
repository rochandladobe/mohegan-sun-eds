# Mohegan Sun EDS — Project Setup Guide

## Project URLs

| Resource | URL |
|---|---|
| GitHub Repo | https://github.com/rochandladobe/mohegan-sun-eds |
| Preview (aem.page) | https://main--mohegan-sun-eds--rochandladobe.aem.page/ |
| Live (aem.live) | https://main--mohegan-sun-eds--rochandladobe.aem.live/ |
| DA Content | https://da.live/#/rochandladobe/mohegan-sun-eds |
| AEM Code Sync App | https://github.com/apps/aem-code-sync |

---

## Architecture

This project uses **Adobe Edge Delivery Services (EDS)** with **Document Authoring (DA)** as the content source.

```
DA (da.live)  ──content sync──►  AEM Code Bus  ──serve──►  aem.page / aem.live
GitHub repo   ──code sync──────►  AEM Code Bus
```

- **Content** is authored in DA at `da.live/#/rochandladobe/mohegan-sun-eds`
- **Code** (blocks, styles, scripts) lives in the GitHub repo
- **AEM Code Sync** bridges the GitHub repo to the AEM code bus
- **Preview** (`aem.page`) reflects the latest saved DA content + latest code
- **Live** (`aem.live`) reflects explicitly published DA content + latest code

---

## fstab.yaml

The `fstab.yaml` file in the repo root tells EDS where to pull content from.

```yaml
mountpoints:
  /:
    url: https://content.da.live/rochandladobe/mohegan-sun-eds/
    type: markup
```

This maps all page requests to the DA content source. When a visitor hits `/`, EDS fetches the document at `https://content.da.live/rochandladobe/mohegan-sun-eds/index` and renders it through the block pipeline.

---

## Prerequisites

- Node.js 18+ (`node -v`)
- npm 9+ (`npm -v`)
- Git
- AEM Code Sync GitHub App installed on the repo (see below)

---

## Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/rochandladobe/mohegan-sun-eds.git
cd mohegan-sun-eds
```

### 2. Install dependencies

```bash
npm install
```

This installs the AEM CLI and any dev dependencies defined in `package.json`.

### 3. Start the local dev server

```bash
npx aem up
```

or, if AEM CLI is installed globally:

```bash
aem up
```

The local server runs at `http://localhost:3000`. It proxies content from the configured DA source and serves code from your local filesystem — so changes to blocks, styles, and scripts are reflected immediately without a deploy.

### 4. Open the homepage

```
http://localhost:3000/
```

---

## AEM Code Sync Setup

AEM Code Sync is a GitHub App that automatically syncs code pushes from your repo to the AEM code bus, making updates available on `aem.page` within seconds of a merge to `main`.

### Install the app

1. Go to: https://github.com/apps/aem-code-sync
2. Click **Install**
3. Select the `rochandladobe` organization (or your personal account)
4. Grant access to the `mohegan-sun-eds` repository
5. Authorize

Once installed, every push to `main` triggers a sync. Check sync status at:
`https://admin.hlx.page/status/rochandladobe/mohegan-sun-eds/main`

---

## Content Authoring Workflow (DA)

1. Open DA: https://da.live/#/rochandladobe/mohegan-sun-eds
2. Open the document to edit (e.g., `index` for the homepage)
3. Edit content using the DA rich-text editor or block tables
4. **Save** — content is immediately available on `aem.page` (preview)
5. **Publish** — promotes content to `aem.live` (production)

For block authoring structure, see [`homepage-structure.md`](./homepage-structure.md).

---

## Repo Structure

```
mohegan-sun-eds/
├── blocks/
│   ├── hero-carousel/
│   │   ├── hero-carousel.js
│   │   └── hero-carousel.css
│   ├── featured-cards/
│   │   ├── featured-cards.js
│   │   └── featured-cards.css
│   ├── promo-cards/
│   │   ├── promo-cards.js
│   │   └── promo-cards.css
│   ├── teaser/
│   │   ├── teaser.js
│   │   └── teaser.css
│   ├── columns/
│   │   ├── columns.js
│   │   └── columns.css
│   └── section-metadata/
│       └── section-metadata.js
├── icons/
│   └── mohegan-sun.ico
├── styles/
│   ├── styles.css
│   └── lazy-styles.css
├── scripts/
│   ├── scripts.js
│   ├── aem.js
│   └── delayed.js
├── fstab.yaml
├── package.json
├── .eslintrc.js
└── README.md
```

---

## Block Reference

| Block | Folder | Description | DA Table columns |
|---|---|---|---|
| `Hero Carousel` | `blocks/hero-carousel/` | Full-width auto-advancing image carousel with text overlay and CTA | 2: image, text/CTA |
| `Featured Cards` | `blocks/featured-cards/` | 3-up card grid with thumbnail, eyebrow label, headline, and link | 3: image, text, CTA |
| `Promo Cards` | `blocks/promo-cards/` | Promotion card grid with thumbnail, title, date | 3: image, title, date |
| `Teaser` | `blocks/teaser/` | 2-column image + text layout with primary and secondary CTAs | 2: image, text |
| `Teaser (reverse)` | `blocks/teaser/` | Same as Teaser but image on right; variant via block name modifier | 2: text, image |
| `Columns` | `blocks/columns/` | Generic N-column layout; used for stats bar | N columns, 1 row |
| `Section Metadata` | `blocks/section-metadata/` | Applies CSS class / data attribute to parent section | 2: key, value |

---

## Styles & Theming

Brand colors are defined as CSS custom properties in `styles/styles.css`:

```css
:root {
  --color-brand-purple: #3b1a5a;
  --color-brand-gold:   #c9a84c;
  --color-dark-bg:      #1a1a1a;
  --color-text-light:   #ffffff;
  --color-text-dark:    #1a1a1a;
}
```

Section style variants (`dark`, `purple`) are applied by the `Section Metadata` block and target these selectors:

```css
main .section[data-section-style='dark']  { background: var(--color-dark-bg); color: var(--color-text-light); }
main .section[data-section-style='purple'] { background: var(--color-brand-purple); color: var(--color-text-light); }
```

---

## Deployment

There is no manual deploy step for code. Merge to `main` → AEM Code Sync → available on `aem.page` within ~30 seconds.

For content, a DA editor must explicitly **Publish** a document to promote it from preview (`aem.page`) to live (`aem.live`).

To bulk-publish or purge cache, use the Admin API:
```
https://admin.hlx.page/publish/rochandladobe/mohegan-sun-eds/main/<path>
```

---

## Useful Links

| Resource | URL |
|---|---|
| EDS Developer Docs | https://www.aem.live/developer/tutorial |
| DA Authoring Guide | https://da.live/docs |
| Block Collection | https://www.aem.live/developer/block-collection |
| Admin API | https://admin.hlx.page/status/rochandladobe/mohegan-sun-eds/main |
| AEM Code Sync App | https://github.com/apps/aem-code-sync |
