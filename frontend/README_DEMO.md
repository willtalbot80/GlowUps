# GlowUps Frontend Demo

A static visual mock of the GlowUps beauty-booking app built with React and Tailwind CSS.

## Running the demo

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**.

## What's included

- **Home page** — hero section and feature highlights
- **Experts page** — three hardcoded expert cards (static mock, no API)

## Notes

- This is a **visual mock only** — there are no backend API calls or authentication.
- Styling uses the custom colour palette defined in `tailwind.config.js`
  (`cream`, `beige`, `gold`, `copper`, `bronze`).
- Navigation is handled via local React state (no router required).

## Building for production

```bash
npm run build
```

Output is placed in the `build/` directory.
