// Home.jsx — demo/design-update PR
// Replaces placeholder Home page with hero + 3-up expert card grid
// using the cream/beige/gold/copper/bronze palette and Merriweather headings.

import React from 'react';

// Hardcoded demo expert data
const EXPERTS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    specialty: 'Hair Colorist',
    bio: 'Specialist in balayage and color correction with 8+ years experience.',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 2,
    name: 'Jessica Park',
    specialty: 'Skincare Consultant',
    bio: 'Board-certified esthetician focused on glow-enhancing routines.',
    avatar: 'https://i.pravatar.cc/150?img=44',
  },
  {
    id: 3,
    name: 'Maria Santos',
    specialty: 'Makeup Artist',
    bio: 'Bridal and editorial makeup artist based in Los Angeles.',
    avatar: 'https://i.pravatar.cc/150?img=48',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-cream font-body">

      {/* Hero Section */}
      <section className="hero">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-bronze mb-4">
          Find Your Perfect Beauty Expert
        </h1>
        <p className="text-copper text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Connect with top-rated hair, skin, and makeup professionals — all in one place.
        </p>
        <button className="btn-gold">Browse Experts</button>
      </section>

      {/* Expert Cards Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-heading text-2xl font-bold text-bronze mb-10 text-center">
          Featured Experts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERTS.map((expert) => (
            <div key={expert.id} className="card flex flex-col items-center text-center">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-gold"
              />
              <h3 className="font-heading text-xl font-bold text-bronze mb-1">
                {expert.name}
              </h3>
              <span className="text-copper text-sm font-semibold mb-3 uppercase tracking-wide">
                {expert.specialty}
              </span>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{expert.bio}</p>
              <button className="btn-gold mt-auto">Book Now</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
