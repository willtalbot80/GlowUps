import React from "react";
import "../index.css";

const BASE = process.env.PUBLIC_URL || '';

const mockups = [
  { src: `${BASE}/images/mock1.jpg`, alt: "GlowUps mockup 1", label: "Hair Expert" },
  { src: `${BASE}/images/mock2.jpg`, alt: "GlowUps mockup 2", label: "Nails Expert" },
  { src: `${BASE}/images/mock3.jpg`, alt: "GlowUps mockup 3", label: "Eyebrows Expert" },
  { src: `${BASE}/images/mock4.jpg`, alt: "GlowUps mockup 4", label: "Facials Expert" }
];

export default function Home() {
  return (
    <main className="min-h-screen py-8 bg-salt-50">
      <div className="container-max px-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-heading text-pepper-900">Experts Credentials</h1>
          <p className="text-sm text-pepper-500 mt-2">Browse categories and expert profiles curated for you.</p>
        </header>

        {/* Vertical list — full width rounded thumbnails like the mockups */}
        <div className="space-y-8">
          {mockups.map((m, i) => (
            <article key={i} className="w-full">
              <div className="overflow-hidden rounded-[28px] bg-white border border-pepper-100 shadow-soft-lg">
                <img
                  src={m.src}
                  alt={m.alt}
                  className="w-full h-44 md:h-56 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-3">
                <h2 className="text-lg font-semibold text-pepper-900">{m.label}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
