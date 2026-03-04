# GlowUps — Frontend Demo

> **This is a static visual mock only.** No backend APIs are called; all data is hardcoded.
> Created as part of the `demo/frontend-ui` PR to preview the app design.

## Running the Demo

```bash
cd frontend
npm install
npm start
```

The app opens at **http://localhost:3000** in your default browser.

## What You'll See

| View | Description |
|------|-------------|
| **Home** | Hero section with branding, call-to-action, and three feature cards (Find Experts, Book Appointments, Read Reviews). |
| **Experts** | Three hardcoded expert cards with avatar placeholders, name, expertise tags, and a short bio. |

## Tech Stack

- React 17 (via `react-scripts`)
- Tailwind CSS v2 with the project's custom palette (`cream`, `beige`, `gold`, `copper`, `bronze`)
- No routing library — view switching uses local React state

## Notes

- Do **not** run `npm run eject`.
- This scaffold has no authentication or backend integration.
- Styling uses the color tokens defined in `tailwind.config.js`.
