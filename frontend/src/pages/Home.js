import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [experts, setExperts] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch('/api/experts')
            .then(res => res.json())
            .then(data => {
                setExperts(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load experts. Please try again later.');
                setLoading(false);
            });
    }, []);

    const filteredExperts = experts.filter(expert =>
        expert.name.toLowerCase().includes(filter.toLowerCase()) ||
        expert.specialty.toLowerCase().includes(filter.toLowerCase())
    );

    const handleExpertClick = (id) => {
        history.push(`/expert/${id}`);
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">GlowUps Beauty Experts</h1>
                <p className="home-subtitle">Discover top-rated beauty professionals tailored for you</p>
                <input
                    className="home-search"
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </header>

            {loading ? (
                <p className="home-loading">Loading experts...</p>
            ) : error ? (
                <p className="home-loading">{error}</p>
            ) : (
                <div className="experts-grid">
                    {filteredExperts.map(expert => (
                        <div
                            key={expert.id}
                            className="expert-card"
                            onClick={() => handleExpertClick(expert.id)}
                        >
                            <img
                                src={expert.image}
                                alt={expert.name}
                                className="expert-avatar"
                            />
                            <h2 className="expert-name">{expert.name}</h2>
                            <p className="expert-specialty">{expert.specialty}</p>
                            <div className="expert-rating">
                                {'★'.repeat(Math.floor(expert.rating))}
                                <span className="expert-rating-value">{expert.rating}</span>
                            </div>
                            <span className="view-profile">View Profile →</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;