// Demo scaffold — Home page. Shows branding hero and feature cards.
// All data is hardcoded; no backend calls are made.
import React from 'react';

const FEATURES = [
  {
    emoji: '🔍',
    title: 'Find Experts',
    description:
      'Browse verified beauty professionals by specialty, location, and availability.',
  },
  {
    emoji: '📅',
    title: 'Book Appointments',
    description:
      'Choose a time that works for you and confirm your booking instantly.',
  },
  {
    emoji: '⭐',
    title: 'Read Reviews',
    description:
      'Authentic ratings from real clients help you make the best choice.',
  },
];

const Home = ({ onBrowseExperts }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold text-bronze mb-4 leading-tight">
          Your Beauty,{' '}
          <span className="text-gold">Elevated.</span>
        </h1>
        <p className="text-lg text-copper max-w-xl mx-auto mb-8">
          Connect with top beauty experts, book appointments, and glow up with
          confidence — all in one place.
        </p>
        <button className="btn-gold text-lg" onClick={onBrowseExperts}>
          Browse Experts →
        </button>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-2xl font-bold text-bronze mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ emoji, title, description }) => (
            <article key={title} className="card text-center">
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="text-xl font-semibold text-bronze mb-2">{title}</h3>
              <p className="text-copper text-sm">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
