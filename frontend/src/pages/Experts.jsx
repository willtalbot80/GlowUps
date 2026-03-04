// Experts.jsx — Hardcoded expert cards (static visual mock, no API calls)
import React from 'react';

// Static list of three demo experts
const EXPERTS = [
  {
    id: 1,
    name: 'Sofia Reyes',
    specialty: 'Hair Stylist',
    bio: 'Award-winning colourist with 10+ years transforming locks in LA and NYC.',
    rating: 4.9,
    reviews: 128,
    emoji: '💇‍♀️',
  },
  {
    id: 2,
    name: 'Marcus Hale',
    specialty: 'Skincare Specialist',
    bio: 'Certified esthetician focused on natural glow and healthy skin routines.',
    rating: 4.8,
    reviews: 95,
    emoji: '🧖‍♂️',
  },
  {
    id: 3,
    name: 'Lia Chen',
    specialty: 'Nail Artist',
    bio: 'Intricate nail designs and gel manicures — bringing art to your fingertips.',
    rating: 5.0,
    reviews: 212,
    emoji: '💅',
  },
];

const Experts = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page heading */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="text-copper hover:text-bronze font-medium"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-extrabold text-bronze">Meet Our Experts</h2>
      </div>

      {/* Expert cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12">
        {EXPERTS.map((expert) => (
          <div
            key={expert.id}
            className="bg-beige rounded-2xl p-6 shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            {/* Avatar placeholder */}
            <div className="text-6xl mb-4">{expert.emoji}</div>
            <h3 className="text-xl font-bold text-bronze">{expert.name}</h3>
            <span className="text-gold font-semibold text-sm mb-2">
              {expert.specialty}
            </span>
            <p className="text-copper text-sm mb-4">{expert.bio}</p>
            {/* Rating and review count */}
            <div className="text-bronze font-medium text-sm">
              ⭐ {expert.rating} ({expert.reviews} reviews)
            </div>
            {/* Book button — static, no action */}
            <button className="btn-gold mt-4 w-full">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experts;
