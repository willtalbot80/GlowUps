import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || '/api';

const DepositPayment = () => {
    const location = useLocation();
    const history = useHistory();
    const { currentUser } = useAuth();
    const { appointment, expert, depositAmount } = location.state || {};

    const [form, setForm] = useState({
        paymentMethod: 'card',
        cardNumber: '',
        expiry: '',
        cvv: '',
        nameOnCard: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!appointment || !currentUser) {
        return (
            <div style={{ paddingTop: '80px', textAlign: 'center', padding: '3rem', color: '#8b4513' }}>
                <p>No deposit information found.</p>
                <button onClick={() => history.push('/dashboard/client')} style={btnStyle}>Go to Dashboard</button>
            </div>
        );
    }

    const amount = depositAmount || 25;
    const expertName = expert ? `${expert.firstName || ''} ${expert.lastName || ''}`.trim() : 'Expert';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post(`${API}/deposits`, {
                expertId: appointment.expertId || expert?._id,
                appointmentId: appointment._id,
                amount,
                paymentMethod: form.paymentMethod,
                status: 'completed',
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 1.5rem' }}>
                <div style={{ maxWidth: '480px', width: '100%', background: '#fff', borderRadius: '20px', padding: '3rem', textAlign: 'center', boxShadow: '0 8px 40px rgba(184,134,11,0.15)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2c1a0e', fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>Payment Successful!</h2>
                    <p style={{ color: '#6b4226', marginBottom: '2rem' }}>
                        Your deposit of <strong style={{ color: '#b8860b' }}>${amount}</strong> has been received.
                        Your booking with {expertName} is confirmed!
                    </p>
                    <button onClick={() => history.push('/dashboard/client')} style={{ ...btnStyle, width: '100%' }}>
                        View My Appointments
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 1.5rem' }}>
            <div style={{ maxWidth: '480px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2c1a0e', fontFamily: 'Georgia, serif' }}>Deposit Payment</h1>
                    <p style={{ color: '#8b4513', marginTop: '0.4rem' }}>Secure your booking with {expertName}</p>
                </div>

                {/* Amount display */}
                <div style={{ background: 'linear-gradient(135deg, #b8860b, #cd7f32)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', color: '#fff' }}>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.3rem' }}>Deposit Amount</p>
                    <p style={{ fontSize: '2.5rem', fontWeight: '800' }}>${amount}</p>
                    <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.3rem' }}>For: {appointment.service}</p>
                </div>

                <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 40px rgba(184,134,11,0.12)' }}>
                    {error && <div style={errorStyle}>{error}</div>}

                    {/* Payment method */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Payment Method</label>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {['card', 'paypal', 'venmo'].map(method => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, paymentMethod: method }))}
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        borderRadius: '8px',
                                        border: `2px solid ${form.paymentMethod === method ? '#b8860b' : '#e8d5c4'}`,
                                        background: form.paymentMethod === method ? 'rgba(184,134,11,0.08)' : '#fff',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        color: form.paymentMethod === method ? '#b8860b' : '#8b4513',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {method === 'card' ? '💳' : method === 'paypal' ? '🅿️' : '💸'} {method}
                                </button>
                            ))}
                        </div>
                    </div>

                    {form.paymentMethod === 'card' && (
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={labelStyle}>Name on Card</label>
                                <input type="text" value={form.nameOnCard} onChange={e => setForm(f => ({ ...f, nameOnCard: e.target.value }))} style={inputStyle} placeholder="Jane Doe" required />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={labelStyle}>Card Number</label>
                                <input type="text" value={form.cardNumber} onChange={e => setForm(f => ({ ...f, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) }))} style={inputStyle} placeholder="1234 5678 9012 3456" maxLength={16} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={labelStyle}>Expiry</label>
                                    <input type="text" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} style={inputStyle} placeholder="MM/YY" maxLength={5} required />
                                </div>
                                <div>
                                    <label style={labelStyle}>CVV</label>
                                    <input type="text" value={form.cvv} onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} style={inputStyle} placeholder="123" maxLength={4} required />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} style={{ ...btnStyle, width: '100%', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Processing...' : `Pay $${amount} Deposit`}
                            </button>
                        </form>
                    )}

                    {form.paymentMethod !== 'card' && (
                        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                            <p style={{ color: '#6b4226', marginBottom: '1.25rem' }}>
                                You'll be redirected to {form.paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'} to complete the ${amount} deposit.
                            </p>
                            <button onClick={handleSubmit} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Processing...' : `Continue with ${form.paymentMethod}`}
                            </button>
                        </div>
                    )}

                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#8b4513', marginTop: '1rem' }}>
                        🔒 Your payment information is secure and encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e8d5c4', borderRadius: '8px', fontSize: '0.95rem', color: '#2c1a0e', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#8b4513', fontSize: '0.9rem' };

export default DepositPayment;
