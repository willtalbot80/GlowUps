import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const ExpertDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const [expert, setExpert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        axios.get(`${API}/experts/${id}`)
            .then(res => setExpert(res.data))
            .catch(() => setError('Expert not found'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ paddingTop: '64px' }}><LoadingSpinner /></div>;
    if (error) return (
        <div style={{ paddingTop: '80px', textAlign: 'center', padding: '3rem', color: '#8b4513' }}>
            <p>{error}</p>
            <button onClick={() => history.push('/browse')} style={btnStyle}>Back to Browse</button>
        </div>
    );

    const fullName = `${expert.firstName || ''} ${expert.lastName || ''}`.trim();
    const reviews = expert.reviews || [];
    const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

    const tabs = ['about', 'portfolio', 'pricing', 'reviews'];

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3' }}>
            {/* Hero */}
            <div style={{
                background: 'linear-gradient(135deg, #2c1a0e, #8b4513)',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                color: '#fff',
            }}>
                {expert.profilePhoto ? (
                    <img src={expert.profilePhoto} alt={fullName} style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #cd7f32', marginBottom: '1rem' }} />
                ) : (
                    <div style={{
                        width: '110px', height: '110px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #cd7f32, #b8860b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.5rem', color: '#fff', margin: '0 auto 1rem',
                        border: '4px solid #cd7f32',
                    }}>
                        {(expert.firstName?.[0] || '') + (expert.lastName?.[0] || '') || '✨'}
                    </div>
                )}
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>{fullName}</h1>
                {(expert.city || expert.state) && (
                    <p style={{ color: '#e8d5c4', marginBottom: '0.5rem' }}>📍 {[expert.city, expert.state].filter(Boolean).join(', ')}</p>
                )}
                {avgRating > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                        <StarRating rating={avgRating} readOnly size="lg" />
                        <span style={{ color: '#e8d5c4' }}>({reviews.length} reviews)</span>
                    </div>
                )}
                {expert.specialties?.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                        {expert.specialties.map((s, i) => (
                            <span key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>{s}</span>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => history.push(`/book/${expert._id}`)}
                    style={{ ...btnStyle, marginTop: '1.5rem', fontSize: '1rem', padding: '0.8rem 2.5rem' }}
                >
                    Book Appointment
                </button>
            </div>

            {/* Tabs */}
            <div style={{ background: '#fff', borderBottom: '2px solid #e8d5c4', display: 'flex', justifyContent: 'center' }}>
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '1rem 1.5rem',
                        border: 'none',
                        background: 'none',
                        fontSize: '0.95rem',
                        fontWeight: activeTab === tab ? '700' : '500',
                        color: activeTab === tab ? '#b8860b' : '#8b4513',
                        borderBottom: activeTab === tab ? '3px solid #b8860b' : '3px solid transparent',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                    }}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
                {activeTab === 'about' && (
                    <div>
                        <div style={cardStyle}>
                            <h2 style={sectionTitle}>About</h2>
                            <p style={{ color: '#6b4226', lineHeight: '1.8' }}>{expert.bio || 'No bio provided.'}</p>
                        </div>
                        {expert.certifications?.length > 0 && (
                            <div style={cardStyle}>
                                <h2 style={sectionTitle}>Certifications</h2>
                                <ul style={{ color: '#6b4226', paddingLeft: '1.5rem' }}>
                                    {expert.certifications.map((c, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>🏆 {c}</li>)}
                                </ul>
                            </div>
                        )}
                        <div style={cardStyle}>
                            <h2 style={sectionTitle}>Service Area</h2>
                            <p style={{ color: '#6b4226' }}>
                                📍 {[expert.address, expert.city, expert.state, expert.zipCode].filter(Boolean).join(', ') || 'Location not specified'}
                            </p>
                            {expert.serviceRadius && <p style={{ color: '#6b4226', marginTop: '0.5rem' }}>🗺️ Serves within {expert.serviceRadius} miles</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'portfolio' && (
                    <div style={cardStyle}>
                        <h2 style={sectionTitle}>Portfolio</h2>
                        {(!expert.portfolioItems || expert.portfolioItems.length === 0) ? (
                            <p style={{ color: '#8b4513' }}>No portfolio items yet.</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                {expert.portfolioItems.map((item, i) => (
                                    <div key={i} style={{ background: '#f5e6d3', borderRadius: '12px', overflow: 'hidden' }}>
                                        {item.images?.[0] && <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
                                        <div style={{ padding: '0.75rem' }}>
                                            <p style={{ fontWeight: '600', color: '#2c1a0e', fontSize: '0.9rem' }}>{item.title}</p>
                                            {item.category && <p style={{ color: '#8b4513', fontSize: '0.8rem' }}>{item.category}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'pricing' && (
                    <div style={cardStyle}>
                        <h2 style={sectionTitle}>Pricing</h2>
                        {expert.hourlyRate && (
                            <div style={{ background: '#f5e6d3', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#b8860b' }}>${expert.hourlyRate}/hr</span>
                                <span style={{ color: '#8b4513', marginLeft: '0.5rem' }}>base rate</span>
                            </div>
                        )}
                        {(!expert.pricingItems || expert.pricingItems.length === 0) ? (
                            <p style={{ color: '#8b4513' }}>No pricing details available. Contact expert for rates.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {expert.pricingItems.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f5e6d3', borderRadius: '10px' }}>
                                        <div>
                                            <p style={{ fontWeight: '600', color: '#2c1a0e' }}>{p.serviceType}</p>
                                            {p.description && <p style={{ color: '#8b4513', fontSize: '0.85rem', marginTop: '0.2rem' }}>{p.description}</p>}
                                            <p style={{ color: '#b8860b', fontSize: '0.85rem', marginTop: '0.2rem' }}>⏱ {p.duration} min</p>
                                        </div>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#b8860b' }}>${p.price}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div style={cardStyle}>
                        <h2 style={sectionTitle}>Reviews ({reviews.length})</h2>
                        {reviews.length === 0 ? (
                            <p style={{ color: '#8b4513' }}>No reviews yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {reviews.map((review, i) => (
                                    <div key={i} style={{ padding: '1rem', background: '#f5e6d3', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: '600', color: '#2c1a0e' }}>
                                                {review.clientId?.firstName} {review.clientId?.lastName}
                                            </span>
                                            <StarRating rating={review.rating} readOnly size="sm" />
                                        </div>
                                        {review.comment && <p style={{ color: '#6b4226', fontSize: '0.9rem', lineHeight: '1.6' }}>{review.comment}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const btnStyle = {
    background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 2rem',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.95rem',
};

const cardStyle = {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 12px rgba(184,134,11,0.1)',
};

const sectionTitle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2c1a0e',
    marginBottom: '1rem',
    fontFamily: 'Georgia, serif',
};

export default ExpertDetail;
