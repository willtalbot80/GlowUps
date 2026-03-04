// Home.jsx — Hero section and feature cards for the GlowUps landing page
import React from 'react';

// Feature data used to render the feature cards
const FEATURES = [
  {
    icon: '💅',
    title: 'Top Beauty Experts',
    description: 'Connect with vetted professionals in hair, skin, nails, and more.',
  },
  {
    icon: '📅',
    title: 'Easy Booking',
    description: 'Browse availability and book appointments in seconds.',
  },
  {
    icon: '⭐',
    title: 'Verified Reviews',
    description: 'Honest ratings from real clients to guide your choice.',
  },
  {
    icon: '💛',
    title: 'Personalised Matches',
    description: 'Get expert recommendations tailored to your style goals.',
  },
];

const Home = ({ onBrowseExperts }) => {
  return (
    <div>
      {/* Hero section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-bronze mb-4">
          Your Glow-Up Starts Here
        </h1>
        <p className="text-lg text-copper max-w-xl mx-auto mb-8">
          Discover and book beauty experts who will help you look and feel your best.
        </p>
        {/* CTA button — navigates to Experts view */}
        <button
          onClick={onBrowseExperts}
          className="btn-gold text-lg"
        >
          Browse Experts
        </button>
      </section>

      {/* Feature cards grid */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-beige rounded-2xl p-6 shadow hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-bold text-bronze mb-2">{feature.title}</h3>
            <p className="text-copper">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
