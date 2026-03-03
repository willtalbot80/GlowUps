import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LocationSearch from '../components/LocationSearch';
import ExpertCard from '../components/ExpertCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const Home = () => {
    const [featuredExperts, setFeaturedExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${API}/experts`)
            .then(res => setFeaturedExperts(Array.isArray(res.data) ? res.data.slice(0, 3) : []))
            .catch(() => setFeaturedExperts([]))
            .finally(() => setLoading(false));
    }, []);

    const steps = [
        { icon: '🔍', title: 'Find Your Expert', desc: 'Search by specialty, location, and budget to discover the perfect beauty professional.' },
        { icon: '📅', title: 'Book an Appointment', desc: 'Choose a convenient date and time, then secure your slot with a small deposit.' },
        { icon: '✨', title: 'Glow Up!', desc: 'Your expert arrives ready to transform your look with professional-grade results.' },
    ];

    return (
        <div style={{ paddingTop: '64px' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '85vh',
                background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 50%, #f5e6d3 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '3rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(184,134,11,0.06)', top: '-100px', right: '-100px' }} />
                <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(205,127,50,0.06)', bottom: '-80px', left: '-80px' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '750px', animation: 'slideUp 0.7s ease' }}>
                    <div style={{ fontSize: '0.95rem', color: '#b8860b', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        ✨ Premium Beauty Booking
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                        fontWeight: '800',
                        color: '#2c1a0e',
                        lineHeight: '1.2',
                        marginBottom: '1.5rem',
                        fontFamily: 'Georgia, serif',
                    }}>
                        Book Expert Beauty
                        <br />
                        <span style={{ background: 'linear-gradient(135deg, #b8860b, #cd7f32)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Professionals Near You
                        </span>
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: '#6b4226', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                        Connect with certified makeup artists, hairstylists, nail technicians, and more.
                        Professional beauty services, right at your doorstep.
                    </p>

                    <LocationSearch onSearch={({ city, state }) => {
                        const q = new URLSearchParams();
                        if (city) q.set('city', city);
                        if (state) q.set('state', state);
                        history.push(`/browse?${q.toString()}`);
                    }} />

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['500+ Experts', '10K+ Appointments', '4.9★ Rating'].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#b8860b' }}>{stat}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#2c1a0e', marginBottom: '0.75rem', fontFamily: 'Georgia, serif' }}>
                        How It Works
                    </h2>
                    <p style={{ textAlign: 'center', color: '#6b4226', marginBottom: '3rem', fontSize: '1.05rem' }}>
                        Three simple steps to your perfect look
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {steps.map((step, i) => (
                            <div key={i} style={{
                                textAlign: 'center',
                                padding: '2.5rem 1.5rem',
                                background: '#f5e6d3',
                                borderRadius: '20px',
                                transition: 'transform 0.3s',
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{step.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '0.75rem' }}>{step.title}</h3>
                                <p style={{ color: '#6b4226', lineHeight: '1.6', fontSize: '0.95rem' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Experts */}
            <section style={{ padding: '5rem 1.5rem', background: '#f5e6d3' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#2c1a0e', marginBottom: '0.75rem', fontFamily: 'Georgia, serif' }}>
                        Featured Experts
                    </h2>
                    <p style={{ textAlign: 'center', color: '#6b4226', marginBottom: '3rem', fontSize: '1.05rem' }}>
                        Top-rated beauty professionals ready to transform your look
                    </p>

                    {loading ? (
                        <LoadingSpinner />
                    ) : featuredExperts.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {featuredExperts.map(expert => <ExpertCard key={expert._id} expert={expert} />)}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#8b4513' }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No experts listed yet. Be the first!</p>
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <button
                            onClick={() => history.push('/browse')}
                            style={{
                                background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
                                color: '#fff',
                                border: 'none',
                                padding: '0.9rem 2.5rem',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                        >
                            Browse All Experts
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#2c1a0e', color: '#e8d5c4', textAlign: 'center', padding: '2rem', fontSize: '0.9rem' }}>
                <p style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600', color: '#b8860b' }}>✨ GlowUps</p>
                <p>© {new Date().getFullYear()} GlowUps. Connecting you with beauty experts.</p>
            </footer>
        </div>
    );
};

export default Home;