// Demo scaffold — src/pages/Experts.jsx
// Static page displaying three hardcoded expert cards (no API calls).
// Uses the project's Tailwind color palette (cream, beige, gold, copper, bronze).
import React from 'react';

const EXPERTS = [
  {
    initials: 'SL',
    name: 'Sofia Laurent',
    title: 'Master Hairstylist',
    tags: ['Hair Colour', 'Balayage', 'Keratin'],
    bio:
      'Sofia has 12 years of experience transforming hair in Paris and New York. Specialises in lived-in colour and cutting-edge balayage techniques.',
    rating: 4.9,
    reviews: 214,
  },
  {
    initials: 'MA',
    name: 'Marcus Adeyemi',
    title: 'Skincare Specialist',
    tags: ['Facials', 'Microneedling', 'Peels'],
    bio:
      'Licensed esthetician with a passion for science-backed skincare. Marcus helps clients achieve lasting results with personalised treatment plans.',
    rating: 4.8,
    reviews: 187,
  },
  {
    initials: 'YT',
    name: 'Yuki Tanaka',
    title: 'Nail Artist',
    tags: ['Gel Nails', 'Nail Art', 'Acrylics'],
    bio:
      'Award-winning nail technician known for intricate hand-painted art. Yuki brings Japanese precision and creativity to every set.',
    rating: 5.0,
    reviews: 302,
  },
];

const ExpertCard = ({ initials, name, title, tags, bio, rating, reviews }) => (
  <article
    className="rounded-2xl overflow-hidden card-shadow flex flex-col"
    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DCC8' }}
  >
    {/* Avatar placeholder */}
    <div
      className="avatar-placeholder w-full h-40 text-4xl font-bold select-none"
      aria-hidden="true"
    >
      {initials}
    </div>

    <div className="p-6 flex flex-col flex-1">
      {/* Name & title */}
      <h3 className="text-xl font-bold mb-1" style={{ color: '#8B6F47' /* bronze */ }}>
        {name}
      </h3>
      <p className="text-sm font-semibold mb-3" style={{ color: '#B87333' /* copper */ }}>
        {title}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-lg font-medium"
            style={{ backgroundColor: '#E8DCC8', color: '#8B6F47' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#6b5840' }}>
        {bio}
      </p>

      {/* Rating row */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-bold" style={{ color: '#D4AF37' /* gold */ }}>
          ★ {rating.toFixed(1)}
        </span>
        <span className="text-xs" style={{ color: '#B87333' }}>
          {reviews} reviews
        </span>
        <button
          className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-transform hover:scale-105"
          style={{ backgroundColor: '#D4AF37' }}
        >
          Book
        </button>
      </div>
    </div>
  </article>
);

const Experts = () => (
  <div className="max-w-5xl mx-auto px-6 py-16">
    <h2
      className="text-3xl font-extrabold text-center mb-2"
      style={{ color: '#8B6F47' /* bronze */ }}
    >
      Our Experts
    </h2>
    <p className="text-center mb-10 text-sm" style={{ color: '#B87333' }}>
      Hardcoded demo data — connect the API to see real profiles.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {EXPERTS.map((expert) => (
        <ExpertCard key={expert.name} {...expert} />
      ))}
    </div>
  </div>
);

export default Experts;
