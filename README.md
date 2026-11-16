# Cedar Hills Unit 5 — Lots 85 & 86 (Apache County, AZ)

One-page land-for-sale web application presenting **10.00 contiguous acres** (`Lots 85 & 86`, APNs `206-07-068` & `206-07-069`) in Cedar Hills Unit Five, Apache County, Arizona.

## Features

- **Desert Sunset & High-Desert Juniper Design**: Responsive light/twilight color system built with CSS `light-dark()` tokens, accessible contrast, and fluid editorial typography.
- **Interactive Survey & KML Waypoints**: Architectural SVG diagram of Lots 85 & 86 (`660′ × 660′`), western dirt-road frontage, northern 50-ft Plat `1-46` easement, and clickable WGS84 GPS coordinates with one-click copy and Google Maps pin links.
- **Property & Approach Image Viewer**: Category-filtered stage, thumbnail selector, and native `<dialog>` full-resolution zoomable lightbox powered by responsive `AVIF`, `WebP`, and fallback `JPEG` assets.
- **Embedded Google My Maps & Access Route**: Interactive Google My Maps iframe, direct `.KML` file download (`public/Cedar_Hills_Lots_85_86.kml`), and concise 4-leg driving directions from Chambers, AZ / I-40 Exit 325.
- **Buyer Disclosure Packet & Direct Contact**: Direct link to the 14-file Google Drive county disclosure packet, native `<details>` FAQ accordion, and email/draft composer targeting `cedarhills.lots8586@gmail.com`.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** + **Tailwind CSS v4**
- **Lucide React** icons

## Local Development

```bash
npm install
npm run dev      # Start local dev server
npm run build    # Type-check and build production bundle to dist/
npm run preview  # Preview production bundle locally
```

## Project Structure

- `src/` — Application components, theme tokens, and verified property data
- `public/Cedar_Hills_Lots_85_86.kml` — Downloadable Google Earth / GPS route & boundary KML file
- `public/media/` — Optimized responsive `AVIF`, `WebP`, and `JPEG` parcel, plat, and approach visuals
- `documents/read-me` — Property brief, embed URLs, and ad copy source notes
