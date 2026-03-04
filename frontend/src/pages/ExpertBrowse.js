import React, { useState, useEffect } from 'react';

const ExpertBrowse = () => {
  const [experts, setExperts] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchExperts = async () => {
    const response = await fetch('/api/experts');
    const data = await response.json();
    setExperts(data);
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const filteredExperts = experts.filter((expert) =>
    expert.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="min-h-screen py-8 bg-salt-50">
      <div className="container-max px-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-heading text-pepper-900">Browse Beauty Experts</h1>
          <p className="text-sm text-pepper-500 mt-2">Find and connect with the perfect expert for you.</p>
        </header>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search experts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full border border-pepper-100 bg-white text-pepper-700 placeholder-pepper-300 focus:outline-none focus:ring-2 focus:ring-accent shadow-soft-lg"
          />
        </div>

        <ul className="space-y-4">
          {filteredExperts.map((expert) => (
            <li
              key={expert.id}
              className="px-5 py-4 rounded-[20px] bg-white border border-pepper-100 shadow-soft-lg text-pepper-900 font-semibold"
            >
              {expert.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ExpertBrowse;
