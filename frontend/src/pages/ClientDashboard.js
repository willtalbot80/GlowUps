import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const statusColors = {
    pending: { bg: '#fff8e1', color: '#b8860b', border: '#b8860b' },
    confirmed: { bg: '#e8f5e9', color: '#2e7d32', border: '#2e7d32' },
    completed: { bg: '#f3e8ff', color: '#6b4226', border: '#cd7f32' },
    cancelled: { bg: '#fce4e4', color: '#c62828', border: '#c62828' },
};

const ClientDashboard = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentUser) { history.push('/login'); return; }
        axios.get(`${API}/appointments`)
            .then(res => setAppointments(res.data))
            .catch(() => setError('Failed to load appointments'))
            .finally(() => setLoading(false));
    }, [currentUser, history]);

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this appointment?')) return;
        try {
            await axios.delete(`${API}/appointments/${id}`);
            setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'cancelled' } : a));
        } catch (e) {
            alert('Failed to cancel appointment');
        }
    };

    const upcoming = appointments.filter(a => a.status === 'pending' || a.status === 'confirmed');
    const past = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');
    const displayed = activeTab === 'upcoming' ? upcoming : past;

    if (loading) return <div style={{ paddingTop: '64px' }}><LoadingSpinner /></div>;

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #2c1a0e, #8b4513)', padding: '2.5rem 1.5rem', color: '#fff' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Georgia, serif' }}>
                            Welcome, {currentUser?.firstName}! ✨
                        </h1>
                        <p style={{ color: '#e8d5c4', marginTop: '0.3rem' }}>Manage your beauty appointments</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => history.push('/browse')} style={btnStyle}>Book Expert</button>
                        <button onClick={logout} style={outlineBtn}>Logout</button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1.5rem' }}>
                {error && <div style={errorStyle}>{error}</div>}

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Upcoming', value: upcoming.length, icon: '📅' },
                        { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, icon: '✅' },
                        { label: 'Total Booked', value: appointments.length, icon: '💅' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 10px rgba(184,134,11,0.1)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
                            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#b8860b' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.85rem', color: '#8b4513' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0', background: '#fff', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(184,134,11,0.1)' }}>
                    {['upcoming', 'past'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            flex: 1, padding: '0.9rem', border: 'none', cursor: 'pointer',
                            background: activeTab === tab ? 'linear-gradient(135deg, #b8860b, #cd7f32)' : '#fff',
                            color: activeTab === tab ? '#fff' : '#8b4513',
                            fontWeight: '600', fontSize: '0.95rem', textTransform: 'capitalize',
                        }}>
                            {tab} ({tab === 'upcoming' ? upcoming.length : past.length})
                        </button>
                    ))}
                </div>

                {/* Appointments list */}
                {displayed.length === 0 ? (
                    <div style={{ textAlign: 'center', background: '#fff', borderRadius: '16px', padding: '3rem', color: '#8b4513' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                        <p>No {activeTab} appointments.</p>
                        {activeTab === 'upcoming' && (
                            <button onClick={() => history.push('/browse')} style={{ ...btnStyle, marginTop: '1rem' }}>Browse Experts</button>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {displayed.map(appt => {
                            const expertName = appt.expertId ? `${appt.expertId.firstName || ''} ${appt.expertId.lastName || ''}`.trim() : 'Expert';
                            const colors = statusColors[appt.status] || statusColors.pending;
                            return (
                                <div key={appt._id} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(184,134,11,0.08)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontWeight: '700', color: '#2c1a0e' }}>{appt.service}</h3>
                                            <span style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}`, padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                                                {appt.status}
                                            </span>
                                        </div>
                                        <p style={{ color: '#8b4513', fontSize: '0.9rem' }}>👩‍🎨 {expertName}</p>
                                        <p style={{ color: '#8b4513', fontSize: '0.9rem' }}>📅 {appt.date} at {appt.time}</p>
                                        {appt.location && <p style={{ color: '#8b4513', fontSize: '0.9rem' }}>📍 {appt.location}</p>}
                                    </div>
                                    {(appt.status === 'pending' || appt.status === 'confirmed') && (
                                        <button onClick={() => handleCancel(appt._id)} style={{ background: 'none', border: '1px solid #c62828', color: '#c62828', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                                            Cancel
                                        </button>
                                    )}
                                    {appt.status === 'completed' && (
                                        <button onClick={() => history.push('/reviews', { expertId: appt.expertId?._id, appointmentId: appt._id })} style={{ ...btnStyle, fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                                            Leave Review
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' };
const outlineBtn = { background: 'none', color: '#e8d5c4', border: '1px solid #e8d5c4', padding: '0.6rem 1.25rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#8b4513' };

export default ClientDashboard;
