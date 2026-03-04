// Demo scaffold — Experts page. Displays 3 hardcoded expert cards as a
// layout/styling preview. No backend API calls are made.
import React from 'react';

const EXPERTS = [
  {
    initials: 'AM',
    name: 'Amara Mitchell',
    expertise: ['Hair Styling', 'Braiding', 'Color'],
    bio:
      'Award-winning stylist with 10+ years crafting natural and textured looks for every occasion.',
  },
  {
    initials: 'SC',
    name: 'Sofia Chen',
    expertise: ['Skin Care', 'Facials', 'Brow Shaping'],
    bio:
      'Licensed esthetician specializing in radiant skin. Known for her gentle touch and calming facials.',
  },
  {
    initials: 'DJ',
    name: 'Devon James',
    expertise: ['Makeup', 'Bridal', 'Editorial'],
    bio:
      'Celebrity makeup artist featured in national publications and bridal shows across the country.',
  },
];

const ExpertCard = ({ initials, name, expertise, bio }) => (
  <article className="card flex gap-5 items-start">
    {/* Avatar placeholder */}
    <div className="avatar-placeholder flex-shrink-0">{initials}</div>

    <div className="flex-1">
      <h3 className="text-xl font-bold text-bronze mb-1">{name}</h3>

      {/* Expertise tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {expertise.map((tag) => (
          <span
            key={tag}
            className="bg-beige text-copper text-xs font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-copper text-sm">{bio}</p>
    </div>
  </article>
);

const Experts = () => (
  <div>
    <h2 className="text-3xl font-bold text-bronze mb-8 text-center">
      Meet Our Experts
    </h2>
    <div className="flex flex-col gap-6">
      {EXPERTS.map((expert) => (
        <ExpertCard key={expert.name} {...expert} />
      ))}
    </div>
  </div>
);

export default Experts;
