// Added by demo PR: demo/frontend-ui
// Static landing section with hero, CTA, and feature cards
import React from 'react';

const features = [
  {
    icon: '💄',
    title: 'Find Beauty Experts',
    description: 'Discover top-rated makeup artists, hairstylists, and skincare pros near you.',
  },
  {
    icon: '📅',
    title: 'Easy Booking',
    description: 'Schedule appointments in seconds with your favourite beauty professionals.',
  },
  {
    icon: '⭐',
    title: 'Verified Reviews',
    description: 'Read honest reviews from real clients before making your choice.',
  },
];

const Home = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-beige to-cream py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-copper mb-4">
          Glow Up with the Best
        </h1>
        <p className="text-lg text-bronze max-w-xl mx-auto mb-8">
          Connect with expert beauty professionals for makeup, hair, skincare, and more.
          Your transformation starts here.
        </p>
        <button
          onClick={() => onNavigate('experts')}
          className="bg-gold text-cream font-bold py-3 px-8 rounded-xl hover:bg-copper transition-colors shadow-md"
        >
          Browse Experts
        </button>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-copper text-center mb-10">
          Why GlowUps?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-beige rounded-2xl p-6 shadow hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-copper mb-2">{feature.title}</h3>
              <p className="text-bronze text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
