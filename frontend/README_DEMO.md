# GlowUps Frontend Demo

> **Added by demo PR: demo/frontend-ui**
> This is a visual mock — there is no backend integration.

## Run Instructions

```bash
cd frontend
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## What's Included

- **Home** — Hero section with CTA and feature cards
- **Experts** — Static list of 3 example expert cards (hardcoded demo data)

Navigation is handled via local React state (no routing library required).

## Palette

Colors are defined in `tailwind.config.js`:

| Name   | Hex       |
|--------|-----------|
| cream  | `#F5F1ED` |
| beige  | `#E8DCC8` |
| gold   | `#D4AF37` |
| copper | `#B87333` |
| bronze | `#8B6F47` |

## Notes

- This is a **design preview only**. No API calls are made.
- Entry point: `src/index.js` → `src/App.jsx`
- Pages: `src/pages/Home.jsx`, `src/pages/Experts.jsx`
