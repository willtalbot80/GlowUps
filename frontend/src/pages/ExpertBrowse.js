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

  const handleBookAppointment = (expert) => {
    // Navigate to booking flow for the expert
    window.location.href = `/book/${expert._id}`;
  };

  const handleEnquire = (expert) => {
    // Open enquiry contact (e.g. email)
    window.location.href = `mailto:${expert.contactInfo?.email}?subject=${encodeURIComponent('Enquiry')}`;
  };

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
          <li key={expert._id}>
            {expert.name}
            {expert.allowBooking !== false ? (
              <button onClick={() => handleBookAppointment(expert)}>
                Book Appointment
              </button>
            ) : (
              <button onClick={() => handleEnquire(expert)}>
                Enquire
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertBrowse;