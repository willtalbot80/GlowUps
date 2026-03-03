import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const Reviews = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const { expertId: prefilledExpertId, appointmentId: prefilledApptId } = location.state || {};

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        expertId: prefilledExpertId || '',
        appointmentId: prefilledApptId || '',
        rating: 0,
        comment: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (prefilledExpertId) {
            setLoading(true);
            axios.get(`${API}/reviews/expert/${prefilledExpertId}`)
                .then(res => setReviews(res.data))
                .catch(() => {})
                .finally(() => setLoading(false));
        }
    }, [prefilledExpertId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) { history.push('/login'); return; }
        if (!form.expertId) { setError('Expert ID is required'); return; }
        if (!form.rating) { setError('Please select a rating'); return; }

        setSubmitting(true);
        setError('');
        try {
            const res = await axios.post(`${API}/reviews`, form);
            setReviews(prev => [res.data, ...prev]);
            setSuccess('Review submitted successfully! Thank you!');
            setForm(f => ({ ...f, rating: 0, comment: '' }));
            setTimeout(() => setSuccess(''), 4000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                <h1 style={{ fontSize: '2rem', color: '#2c1a0e', fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>Reviews ⭐</h1>
                <p style={{ color: '#8b4513', marginBottom: '2rem' }}>Share your experience or read what others have said</p>

                {/* Write a Review */}
                {currentUser && (
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(184,134,11,0.1)' }}>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '1.25rem', fontFamily: 'Georgia, serif' }}>
                            Write a Review
                        </h2>

                        {success && <div style={{ background: '#e8f5e9', border: '1px solid #43a047', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#2e7d32', fontSize: '0.9rem' }}>{success}</div>}
                        {error && <div style={errorStyle}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            {!prefilledExpertId && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={labelStyle}>Expert ID</label>
                                    <input
                                        type="text"
                                        value={form.expertId}
                                        onChange={e => setForm(f => ({ ...f, expertId: e.target.value }))}
                                        style={inputStyle}
                                        placeholder="Expert user ID"
                                        required
                                    />
                                </div>
                            )}

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={labelStyle}>Your Rating *</label>
                                <StarRating
                                    rating={form.rating}
                                    onRate={(val) => setForm(f => ({ ...f, rating: val }))}
                                    size="lg"
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={labelStyle}>Your Review</label>
                                <textarea
                                    value={form.comment}
                                    onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                                    style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                    placeholder="Share your experience with this expert..."
                                />
                            </div>

                            <button type="submit" disabled={submitting} style={{ ...btnStyle, opacity: submitting ? 0.7 : 1 }}>
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                )}

                {!currentUser && (
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#8b4513' }}>
                        <p>Please <a href="/login" style={{ color: '#b8860b', fontWeight: '600' }}>sign in</a> to leave a review.</p>
                    </div>
                )}

                {/* Reviews List */}
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>
                    Reviews {reviews.length > 0 && `(${reviews.length})`}
                </h2>

                {loading ? (
                    <LoadingSpinner />
                ) : reviews.length === 0 ? (
                    <div style={{ textAlign: 'center', background: '#fff', borderRadius: '16px', padding: '3rem', color: '#8b4513' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
                        <p>No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {reviews.map((review, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(184,134,11,0.08)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: '42px', height: '42px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #e8d5c4, #cd7f32)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: '700', fontSize: '1rem',
                                        }}>
                                            {review.clientId?.firstName?.[0] || '?'}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600', color: '#2c1a0e', fontSize: '0.95rem' }}>
                                                {review.clientId?.firstName} {review.clientId?.lastName}
                                            </p>
                                            <p style={{ color: '#8b4513', fontSize: '0.8rem' }}>
                                                {review.date ? new Date(review.date).toLocaleDateString() : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <StarRating rating={review.rating} readOnly size="sm" />
                                </div>
                                {review.comment && (
                                    <p style={{ color: '#6b4226', lineHeight: '1.7', fontSize: '0.95rem' }}>{review.comment}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #e8d5c4', borderRadius: '8px', fontSize: '0.95rem', color: '#2c1a0e', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#8b4513', fontSize: '0.9rem' };

export default Reviews;
