// Demo scaffold — src/pages/Home.jsx
// Static landing page: hero section + three feature cards.
// Uses the project's Tailwind color palette (cream, beige, gold, copper, bronze).
import React from 'react';

const FEATURES = [
  {
    icon: '🔍',
    title: 'Find Experts',
    description:
      'Browse a curated list of certified beauty professionals near you — hair, skin, nails, and more.',
  },
  {
    icon: '📅',
    title: 'Book an Appointment',
    description:
      'Check real-time availability and instantly book at a time that suits you, no phone calls needed.',
  },
  {
    icon: '⭐',
    title: 'Read Reviews',
    description:
      'Verified reviews from real clients so you can choose with confidence every single time.',
  },
];

const Home = ({ onNavigate }) => {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #E8DCC8 0%, #F5F1ED 100%)' }}
      >
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight"
          style={{ color: '#8B6F47' /* bronze */ }}
        >
          Your Beauty, Your Way
        </h1>
        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#B87333' /* copper */ }}>
          Discover top-rated beauty experts, book effortlessly, and glow up — on your schedule.
        </p>
        <button
          onClick={() => onNavigate('experts')}
          className="px-8 py-3 rounded-xl text-white font-bold text-lg shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: '#D4AF37' /* gold */ }}
        >
          Browse Experts →
        </button>
      </section>

      {/* ── Feature cards ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="text-2xl font-bold text-center mb-10"
          style={{ color: '#8B6F47' /* bronze */ }}
        >
          Why GlowUps?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURES.map(({ icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl p-8 card-shadow text-center"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DCC8' }}
            >
              <div className="text-5xl mb-4" role="img" aria-label={title}>
                {icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#8B6F47' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b5840' }}>
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
