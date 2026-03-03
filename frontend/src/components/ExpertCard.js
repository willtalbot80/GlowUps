import React from 'react';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const ExpertCard = ({ expert }) => {
    const history = useHistory();
    const fullName = `${expert.firstName || ''} ${expert.lastName || ''}`.trim() || 'Expert';
    const initials = (expert.firstName?.[0] || '') + (expert.lastName?.[0] || '');
    const avgRating = expert.avgRating || 0;
    const reviewCount = expert.reviewCount || 0;

    return (
        <div className="card" style={{
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
        }}
            onClick={() => history.push(`/experts/${expert._id}`)}
        >
            {/* Top accent bar */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #b8860b, #cd7f32)' }} />

            <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    {expert.profilePhoto ? (
                        <img
                            src={expert.profilePhoto}
                            alt={fullName}
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #cd7f32',
                                flexShrink: 0,
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #e8d5c4, #cd7f32)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            color: '#fff',
                            fontWeight: 'bold',
                            border: '3px solid #cd7f32',
                            flexShrink: 0,
                        }}>
                            {initials || '✨'}
                        </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '0.2rem' }}>
                            {fullName}
                        </h3>
                        {(expert.city || expert.state) && (
                            <p style={{ fontSize: '0.85rem', color: '#8b4513', marginBottom: '0.3rem' }}>
                                📍 {[expert.city, expert.state].filter(Boolean).join(', ')}
                            </p>
                        )}
                        {avgRating > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <StarRating rating={avgRating} size="sm" />
                                <span style={{ fontSize: '0.8rem', color: '#6b4226' }}>({reviewCount})</span>
                            </div>
                        )}
                    </div>
                </div>

                {expert.bio && (
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#6b4226',
                        marginBottom: '1rem',
                        lineHeight: '1.5',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {expert.bio}
                    </p>
                )}

                {expert.specialties && expert.specialties.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                        {expert.specialties.slice(0, 3).map((s, i) => (
                            <span key={i} style={{
                                background: 'rgba(184, 134, 11, 0.1)',
                                color: '#b8860b',
                                border: '1px solid rgba(184, 134, 11, 0.3)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '20px',
                                fontSize: '0.78rem',
                                fontWeight: '500',
                            }}>
                                {s}
                            </span>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {expert.hourlyRate ? (
                        <span style={{ fontSize: '1rem', fontWeight: '700', color: '#b8860b' }}>
                            ${expert.hourlyRate}<span style={{ fontSize: '0.8rem', fontWeight: '400', color: '#8b4513' }}>/hr</span>
                        </span>
                    ) : (
                        <span style={{ fontSize: '0.85rem', color: '#8b4513' }}>Rate TBD</span>
                    )}

                    <button
                        onClick={(e) => { e.stopPropagation(); history.push(`/book/${expert._id}`); }}
                        style={{
                            background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1.1rem',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpertCard;
