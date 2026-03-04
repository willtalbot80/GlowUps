import React, { useState, useEffect } from 'react';

const Expert = () => {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setMessage('Failed to load reviews.');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Expert Dashboard</h1>
      {message && <p>{message}</p>}
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id || review.id}>
              Rating: {review.rating} — {review.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Expert;
