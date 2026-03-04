// Added by demo PR: demo/frontend-ui
// Static list of 3 hardcoded demo expert cards (no backend integration)
import React from 'react';

const expertData = [
  {
    id: 1,
    name: 'Sofia Rivera',
    specialty: 'Makeup Artist',
    rating: 4.9,
    reviews: 128,
    bio: 'Award-winning bridal and editorial makeup artist with 10+ years of experience.',
    avatar: '👩‍🎨',
    tags: ['Bridal', 'Editorial', 'Contouring'],
  },
  {
    id: 2,
    name: 'James Okafor',
    specialty: 'Hairstylist',
    rating: 4.8,
    reviews: 95,
    bio: 'Specialising in natural curls and protective styling for all hair textures.',
    avatar: '💇',
    tags: ['Natural Curls', 'Protective Styles', 'Color'],
  },
  {
    id: 3,
    name: 'Mei Lin',
    specialty: 'Skincare Specialist',
    rating: 5.0,
    reviews: 74,
    bio: 'Licensed esthetician focused on holistic skincare routines and facial treatments.',
    avatar: '🧖‍♀️',
    tags: ['Facials', 'Anti-Aging', 'Holistic'],
  },
];

const Experts = ({ onNavigate }) => {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-copper text-center mb-2">
        Our Experts
      </h2>
      <p className="text-center text-bronze mb-10">
        A preview of the talented professionals on GlowUps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expertData.map((expert) => (
          <div
            key={expert.id}
            className="bg-beige rounded-2xl p-6 shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-3">{expert.avatar}</div>
            <h3 className="text-xl font-bold text-copper">{expert.name}</h3>
            <p className="text-gold font-semibold mb-2">{expert.specialty}</p>
            <p className="text-bronze text-sm mb-4">{expert.bio}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4 text-sm text-bronze">
              <span className="text-gold">★</span>
              <span className="font-bold">{expert.rating}</span>
              <span>({expert.reviews} reviews)</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {expert.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-cream text-bronze text-xs py-1 px-3 rounded-full border border-beige"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-auto bg-gold text-cream font-bold py-2 px-6 rounded-xl hover:bg-copper transition-colors">
              Book Now
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => onNavigate('home')}
          className="text-bronze underline hover:text-copper transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Experts;
