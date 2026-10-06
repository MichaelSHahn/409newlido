# 409NewLido.com

Single-page, for-sale-by-owner listing site for **409 New Lido Dr, Lakeway, TX 78734**.
Plain HTML, CSS and vanilla JavaScript: no build step, no dependencies. GitHub Pages serves it as is.

```
409newlido/
├── index.html          ← all page content (price, contact info, documents link)
├── css/styles.css      ← all styling
├── js/photos.js        ← THE PHOTO LIST (the only file to edit for pictures)
├── js/main.js          ← nav, gallery, lightbox and animations (no edits needed)
├── images/             ← put photos here (also holds contours.svg + og-card.jpg)
├── favicon.svg, favicon-32.png, apple-touch-icon.png
├── 404.html
├── CNAME               ← 409newlido.com
└── .nojekyll           ← tells GitHub Pages to serve files as is
```

## Preview locally

```bash
cd 409newlido
python3 -m http.server 8000
# open http://localhost:8000
```

## 1. Photos

Professional photos from **Austin 360 Photography** (shot Oct 5, 2026) are already wired in.

```
images/
├── hero.jpg              ← full-bleed hero (2560 px, photo #04)
├── og-card.jpg           ← 1200×630 social share card
├── contours.svg          ← abstract accent for the Documents section
├── full/01.jpg … 50.jpg  ← gallery, ≈2400 px long edge
└── thumbs/01.jpg … 50.jpg← gallery thumbs, ≈800 px
```

The gallery list, captions, room filters and hero path all live in **`js/photos.js`**.

### Replace or reorder a photo
1. Overwrite `images/full/NN.jpg` and `images/thumbs/NN.jpg` (keep the same numbers), **or** add a new pair and add a line to the `GALLERY` array.
2. Captions and filter groups (`exterior`, `living`, `kitchen`, `primary`, `bedrooms`, `upstairs`, `outdoor`) are set per entry in that array.
3. Optional: `size: "large"` (2×2 tile) or `size: "wide"` (2 columns).

### Change the hero
Set `const HERO_PHOTO = "images/hero.jpg";` (or another path) at the top of `js/photos.js`. Leave it as `""` to fall back to the dark contour background. A darkening overlay is applied automatically.

### Regenerating web images from the 6000 px originals
Do **not** commit the print-size originals (≈14 MB each). From a copy of the print set:

```bash
# example: long edge 2400 / 800 / 2560, quality ~82, progressive, EXIF stripped
python3 ../_build/optimize.py   # or your own Pillow/squoosh pipeline
```

Target: keep the whole repo well under 100 MB.

### Social share image
`images/og-card.jpg` is the Open Graph / Twitter preview. Replace it with any 1200×630 JPG to change what appears when the link is shared.

## 2. Set the price

In `index.html`, search for **`PRICE — EDIT HERE`**. It's the only place the price appears:

```html
<p class="hero__price" id="price">Price upon request</p>
```

Replace `Price upon request` with the asking price, e.g. `$1,250,000`.

## 3. Edit the contact info

In `index.html`, search for **`CONTACT INFO — EDIT HERE`**. Replace:

| Placeholder | Replace with | Where |
|---|---|---|
| `Your Name` | seller's name | `contact__name` line |
| `(512) 000-0000` | phone number | the visible text **and** `href="tel:+15120000000"` (digits only, keep `+1`) |
| `email@example.com` | email address | the visible text, the `mailto:` link above it, **and** the `mailto:` in the "Schedule a showing" button |

The "Schedule a showing" button opens the visitor's email app with a prefilled subject
("Showing request — 409 New Lido Dr") and body. No form or backend is involved.
Every other "Schedule a showing" button on the page scrolls to this contact section.

## 4. Buyer document folder

Search `index.html` for **`BUYER DOCUMENT FOLDER LINK`**. The button points to
`https://drive.google.com/drive/folders/1Eaab8Qq7zf1jsWYrP8cECoMVremU22ET`.
Confirm the folder is shared as **"Anyone with the link can view"** and that it holds the files
listed on the page (appraisal, survey, plat, deed restrictions, MUD notice, mold clearance,
final inspection and a sample utility bill). The seller's disclosure is intentionally not linked ("available on request").

## 5. Publish on GitHub Pages with the custom domain

1. Create a GitHub repo, push the **contents** of this folder to the root of the `main` branch
   (`index.html` must be at the repo root).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main` / `(root)`.
3. `CNAME` already contains `409newlido.com`. At your domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<your-github-username>.github.io`
4. After DNS propagates, tick **Enforce HTTPS** in Settings → Pages.

The Open Graph and canonical tags already use `https://409newlido.com/`.

## Content rules this site follows

- All facts come from the owner. Don't add room dimensions, school names beyond
  Lake Travis ISD, roof age or other unverified details.
- Fair housing: describe the property, not who should live there.
- The footer carries the Equal Housing Opportunity statement and "Information deemed reliable but not guaranteed."
