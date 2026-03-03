import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const ExpertDashboard = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('appointments');
    const [error, setError] = useState('');

    // Profile form state
    const [profile, setProfile] = useState({
        bio: currentUser?.bio || '',
        specialties: (currentUser?.specialties || []).join(', '),
        hourlyRate: currentUser?.hourlyRate || '',
        city: currentUser?.city || '',
        state: currentUser?.state || '',
        zipCode: currentUser?.zipCode || '',
        serviceRadius: currentUser?.serviceRadius || 25,
    });
    const [profileSaved, setProfileSaved] = useState(false);

    // Pricing form
    const [pricingItems, setPricingItems] = useState([]);
    const [newPricing, setNewPricing] = useState({ serviceType: '', price: '', duration: 60, description: '' });
    const [pricingMsg, setPricingMsg] = useState('');

    useEffect(() => {
        if (!currentUser) { history.push('/login'); return; }
        if (currentUser.userType !== 'expert') { history.push('/dashboard/client'); return; }

        const id = currentUser.id;
        Promise.all([
            axios.get(`${API}/experts/${id}/appointments`).catch(() => ({ data: [] })),
            axios.get(`${API}/experts/${id}`).catch(() => ({ data: {} })),
        ]).then(([apptRes, expertRes]) => {
            setAppointments(apptRes.data);
            setPricingItems(expertRes.data.pricingItems || []);
        }).finally(() => setLoading(false));
    }, [currentUser, history]);

    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API}/experts/${currentUser.id}/profile`, {
                ...profile,
                specialties: profile.specialties.split(',').map(s => s.trim()).filter(Boolean),
                hourlyRate: Number(profile.hourlyRate),
                serviceRadius: Number(profile.serviceRadius),
            });
            setProfileSaved(true);
            setTimeout(() => setProfileSaved(false), 3000);
        } catch {
            setError('Failed to save profile');
        }
    };

    const addPricing = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/experts/${currentUser.id}/pricing`, {
                ...newPricing,
                price: Number(newPricing.price),
                duration: Number(newPricing.duration),
            });
            setPricingItems(prev => [...prev.filter(p => p.serviceType !== res.data.serviceType), res.data]);
            setNewPricing({ serviceType: '', price: '', duration: 60, description: '' });
            setPricingMsg('Pricing saved!');
            setTimeout(() => setPricingMsg(''), 3000);
        } catch {
            setPricingMsg('Failed to save pricing');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${API}/appointments/${id}`, { status });
            setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        } catch {
            alert('Failed to update status');
        }
    };

    if (loading) return <div style={{ paddingTop: '64px' }}><LoadingSpinner /></div>;

    const pending = appointments.filter(a => a.status === 'pending');
    const confirmed = appointments.filter(a => a.status === 'confirmed');

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3' }}>
            <div style={{ background: 'linear-gradient(135deg, #2c1a0e, #8b4513)', padding: '2.5rem 1.5rem', color: '#fff' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Georgia, serif' }}>
                            Expert Dashboard ✨
                        </h1>
                        <p style={{ color: '#e8d5c4', marginTop: '0.3rem' }}>{currentUser?.firstName} {currentUser?.lastName}</p>
                    </div>
                    <button onClick={logout} style={{ background: 'none', color: '#e8d5c4', border: '1px solid #e8d5c4', padding: '0.6rem 1.25rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '600' }}>
                        Logout
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1.5rem' }}>
                {error && <div style={errorStyle}>{error}</div>}

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Pending', value: pending.length, icon: '⏳' },
                        { label: 'Confirmed', value: confirmed.length, icon: '✅' },
                        { label: 'Total', value: appointments.length, icon: '📅' },
                    ].map(s => (
                        <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 10px rgba(184,134,11,0.1)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#b8860b' }}>{s.value}</div>
                            <div style={{ fontSize: '0.85rem', color: '#8b4513' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0', background: '#fff', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(184,134,11,0.1)' }}>
                    {['appointments', 'pricing', 'profile'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            flex: 1, padding: '0.9rem', border: 'none', cursor: 'pointer',
                            background: activeTab === tab ? 'linear-gradient(135deg, #b8860b, #cd7f32)' : '#fff',
                            color: activeTab === tab ? '#fff' : '#8b4513',
                            fontWeight: '600', fontSize: '0.95rem', textTransform: 'capitalize',
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    appointments.length === 0 ? (
                        <div style={{ textAlign: 'center', background: '#fff', borderRadius: '16px', padding: '3rem', color: '#8b4513' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                            <p>No appointments yet. Your profile needs to be discovered!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {appointments.map(appt => {
                                const clientName = appt.clientId ? `${appt.clientId.firstName || ''} ${appt.clientId.lastName || ''}`.trim() : 'Client';
                                return (
                                    <div key={appt._id} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(184,134,11,0.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ fontWeight: '700', color: '#2c1a0e', marginBottom: '0.4rem' }}>{appt.service}</h3>
                                            <p style={{ color: '#8b4513', fontSize: '0.9rem' }}>👤 {clientName}</p>
                                            <p style={{ color: '#8b4513', fontSize: '0.9rem' }}>📅 {appt.date} at {appt.time}</p>
                                            {appt.location && <p style={{ color: '#8b4513', fontSize: '0.9rem' }}>📍 {appt.location}</p>}
                                            <span style={{ display: 'inline-block', marginTop: '0.4rem', background: '#f5e6d3', color: '#b8860b', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                                                {appt.status}
                                            </span>
                                        </div>
                                        {appt.status === 'pending' && (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => updateStatus(appt._id, 'confirmed')} style={{ background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                                                    Confirm
                                                </button>
                                                <button onClick={() => updateStatus(appt._id, 'cancelled')} style={{ background: 'none', border: '1px solid #c62828', color: '#c62828', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                                                    Decline
                                                </button>
                                            </div>
                                        )}
                                        {appt.status === 'confirmed' && (
                                            <button onClick={() => updateStatus(appt._id, 'completed')} style={{ background: 'linear-gradient(135deg, #2e7d32, #43a047)', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                                                Mark Complete
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )
                )}

                {/* Pricing Tab */}
                {activeTab === 'pricing' && (
                    <div>
                        <div style={cardStyle}>
                            <h2 style={sectionTitle}>Add / Update Service Pricing</h2>
                            <form onSubmit={addPricing} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Service Name</label>
                                    <input style={inputStyle} value={newPricing.serviceType} onChange={e => setNewPricing(p => ({ ...p, serviceType: e.target.value }))} placeholder="e.g. Full Glam Makeup" required />
                                </div>
                                <div>
                                    <label style={labelStyle}>Price ($)</label>
                                    <input style={inputStyle} type="number" value={newPricing.price} onChange={e => setNewPricing(p => ({ ...p, price: e.target.value }))} placeholder="e.g. 150" required />
                                </div>
                                <div>
                                    <label style={labelStyle}>Duration (min)</label>
                                    <input style={inputStyle} type="number" value={newPricing.duration} onChange={e => setNewPricing(p => ({ ...p, duration: e.target.value }))} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Description</label>
                                    <input style={inputStyle} value={newPricing.description} onChange={e => setNewPricing(p => ({ ...p, description: e.target.value }))} placeholder="Optional" />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <button type="submit" style={{ ...btnPrimary }}>Save Pricing</button>
                                    {pricingMsg && <span style={{ marginLeft: '1rem', color: '#b8860b', fontSize: '0.9rem' }}>{pricingMsg}</span>}
                                </div>
                            </form>
                        </div>
                        {pricingItems.length > 0 && (
                            <div style={cardStyle}>
                                <h2 style={sectionTitle}>Current Pricing</h2>
                                {pricingItems.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f5e6d3' }}>
                                        <div>
                                            <p style={{ fontWeight: '600', color: '#2c1a0e' }}>{p.serviceType}</p>
                                            {p.description && <p style={{ color: '#8b4513', fontSize: '0.85rem' }}>{p.description}</p>}
                                            <p style={{ color: '#b8860b', fontSize: '0.85rem' }}>⏱ {p.duration} min</p>
                                        </div>
                                        <span style={{ fontWeight: '700', color: '#b8860b', fontSize: '1.1rem' }}>${p.price}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div style={cardStyle}>
                        <h2 style={sectionTitle}>Update Profile & Location</h2>
                        <form onSubmit={saveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ gridColumn: '1/-1' }}>
                                <label style={labelStyle}>Bio</label>
                                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Tell clients about yourself..." />
                            </div>
                            <div style={{ gridColumn: '1/-1' }}>
                                <label style={labelStyle}>Specialties (comma separated)</label>
                                <input style={inputStyle} value={profile.specialties} onChange={e => setProfile(p => ({ ...p, specialties: e.target.value }))} placeholder="Makeup, Hair, Lashes" />
                            </div>
                            <div>
                                <label style={labelStyle}>Hourly Rate ($)</label>
                                <input style={inputStyle} type="number" value={profile.hourlyRate} onChange={e => setProfile(p => ({ ...p, hourlyRate: e.target.value }))} />
                            </div>
                            <div>
                                <label style={labelStyle}>Service Radius (miles)</label>
                                <input style={inputStyle} type="number" value={profile.serviceRadius} onChange={e => setProfile(p => ({ ...p, serviceRadius: e.target.value }))} />
                            </div>
                            <div>
                                <label style={labelStyle}>City</label>
                                <input style={inputStyle} value={profile.city} onChange={e => setProfile(p => ({ ...p, city: e.target.value }))} />
                            </div>
                            <div>
                                <label style={labelStyle}>State</label>
                                <input style={inputStyle} value={profile.state} onChange={e => setProfile(p => ({ ...p, state: e.target.value }))} />
                            </div>
                            <div>
                                <label style={labelStyle}>ZIP Code</label>
                                <input style={inputStyle} value={profile.zipCode} onChange={e => setProfile(p => ({ ...p, zipCode: e.target.value }))} />
                            </div>
                            <div style={{ gridColumn: '1/-1' }}>
                                <button type="submit" style={btnPrimary}>Save Profile</button>
                                {profileSaved && <span style={{ marginLeft: '1rem', color: '#b8860b' }}>✓ Saved!</span>}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e8d5c4', borderRadius: '8px', fontSize: '0.9rem', color: '#2c1a0e', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const btnPrimary = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.7rem 1.75rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' };
const cardStyle = { background: '#fff', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(184,134,11,0.1)' };
const sectionTitle = { fontSize: '1.1rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '1.25rem', fontFamily: 'Georgia, serif' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#8b4513' };

export default ExpertDashboard;
