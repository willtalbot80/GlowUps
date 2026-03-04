import React, { useState, useEffect } from 'react';

const ExpertBrowse = () => {
  const [experts, setExperts] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchExperts = async () => {
    // Simulate a fetch call to get beauty experts
    const response = await fetch('/api/experts'); // Example API endpoint
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
    <div>
      <h1>Browse Beauty Experts</h1>
      <input
        type="text"
        placeholder="Search experts..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredExperts.map((expert) => (
          <li key={expert.id}>{expert.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertBrowse;