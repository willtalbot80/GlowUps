import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const BookAppointment = () => {
    const { expertId } = useParams();
    const history = useHistory();
    const { currentUser } = useAuth();

    const [expert, setExpert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        date: '',
        time: '',
        service: '',
        duration: 60,
        notes: '',
        location: '',
    });

    useEffect(() => {
        if (!currentUser) {
            history.push('/login');
            return;
        }
        axios.get(`${API}/experts/${expertId}`)
            .then(res => setExpert(res.data))
            .catch(() => setError('Expert not found'))
            .finally(() => setLoading(false));
    }, [expertId, currentUser, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.date || !form.time || !form.service) {
            setError('Please fill in date, time, and service.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const res = await axios.post(`${API}/appointments`, {
                expertId,
                ...form,
                duration: Number(form.duration),
            });
            history.push('/confirmation', { appointment: res.data, expert });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book appointment.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ paddingTop: '64px' }}><LoadingSpinner /></div>;

    const services = expert?.pricingItems?.map(p => p.serviceType) || expert?.specialties || [];
    const fullName = expert ? `${expert.firstName || ''} ${expert.lastName || ''}`.trim() : '';

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5e6d3', padding: '80px 1.5rem 3rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', color: '#2c1a0e', fontFamily: 'Georgia, serif', marginBottom: '0.5rem' }}>
                    Book Appointment
                </h1>
                {expert && (
                    <p style={{ color: '#8b4513', marginBottom: '2rem' }}>
                        with <strong>{fullName}</strong>
                        {expert.city && <span> · 📍 {expert.city}, {expert.state}</span>}
                    </p>
                )}

                {error && <div style={errorStyle}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(184,134,11,0.1)' }}>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Date *</label>
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={form.date}
                            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Time *</label>
                        <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} style={inputStyle} required>
                            <option value="">Select a time</option>
                            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Service *</label>
                        {services.length > 0 ? (
                            <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={inputStyle} required>
                                <option value="">Select a service</option>
                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        ) : (
                            <input type="text" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={inputStyle} placeholder="e.g. Makeup Application" required />
                        )}
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Duration (minutes)</label>
                        <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} style={inputStyle}>
                            {[30, 60, 90, 120, 180].map(d => <option key={d} value={d}>{d} min</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Location / Address</label>
                        <input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={inputStyle} placeholder="Where should the expert come?" />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Notes</label>
                        <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Any special requests or notes..." />
                    </div>

                    {expert?.pricingItems && (
                        <div style={{ background: '#f5e6d3', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem' }}>
                            <p style={{ fontWeight: '600', color: '#2c1a0e', marginBottom: '0.5rem' }}>💰 Pricing</p>
                            {expert.hourlyRate && <p style={{ color: '#b8860b', fontWeight: '600' }}>${expert.hourlyRate}/hr base rate</p>}
                        </div>
                    )}

                    <button type="submit" disabled={submitting} style={{ ...btnStyle, width: '100%', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #e8d5c4', borderRadius: '8px', fontSize: '0.95rem', color: '#2c1a0e', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#8b4513' };

export default BookAppointment;
