import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ExpertDetail.css';

const ExpertDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const [expert, setExpert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/experts/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Expert not found');
                return res.json();
            })
            .then(data => {
                setExpert(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="detail-container">
                <p className="detail-loading">Loading expert profile...</p>
            </div>
        );
    }

    if (error || !expert) {
        return (
            <div className="detail-container">
                <button className="back-btn" onClick={() => history.push('/')}>← Back to Experts</button>
                <p className="detail-error">Expert not found.</p>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <button className="back-btn" onClick={() => history.push('/')}>← Back to Experts</button>
            <div className="detail-card">
                <div className="detail-header">
                    <img
                        src={expert.image}
                        alt={expert.name}
                        className="detail-avatar"
                    />
                    <div className="detail-header-info">
                        <h1 className="detail-name">{expert.name}</h1>
                        <p className="detail-specialty">{expert.specialty}</p>
                        <div className="detail-rating">
                            {'★'.repeat(Math.floor(expert.rating))}
                            <span className="detail-rating-value">{expert.rating} / 5.0</span>
                        </div>
                        <p className="detail-experience">
                            <strong>Experience:</strong> {expert.experience}
                        </p>
                    </div>
                </div>

                <div className="detail-section">
                    <h2 className="detail-section-title">About</h2>
                    <p className="detail-bio">{expert.bio}</p>
                </div>

                <div className="detail-section">
                    <h2 className="detail-section-title">Certifications</h2>
                    <ul className="detail-certifications">
                        {expert.certifications.map((cert, index) => (
                            <li key={index} className="detail-cert-item">{cert}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExpertDetail;
