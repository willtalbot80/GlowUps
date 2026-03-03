import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { register } = useAuth();
    const history = useHistory();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'client',
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            const { confirmPassword, ...submitData } = form;
            const user = await register(submitData);
            if (user.userType === 'expert') {
                history.push('/dashboard/expert');
            } else {
                history.push('/dashboard/client');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

    return (
        <div style={{
            paddingTop: '64px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5e6d3, #e8d5c4)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '80px 1.5rem 3rem',
        }}>
            <div style={{ maxWidth: '520px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#2c1a0e', fontFamily: 'Georgia, serif' }}>
                        Join GlowUps ✨
                    </h1>
                    <p style={{ color: '#8b4513', marginTop: '0.5rem' }}>Create your account and start your beauty journey</p>
                </div>

                <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 8px 40px rgba(184,134,11,0.12)' }}>
                    {error && <div style={errorStyle}>{error}</div>}

                    {/* User Type Selector */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>I am a</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[{ value: 'client', label: '💅 Client', desc: 'Book beauty services' },
                              { value: 'expert', label: '✨ Expert', desc: 'Offer beauty services' }].map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, userType: opt.value }))}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${form.userType === opt.value ? '#b8860b' : '#e8d5c4'}`,
                                        background: form.userType === opt.value ? 'rgba(184,134,11,0.08)' : '#fff',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: form.userType === opt.value ? '#b8860b' : '#2c1a0e' }}>{opt.label}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#8b4513', marginTop: '0.2rem' }}>{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={labelStyle}>First Name</label>
                                <input type="text" value={form.firstName} onChange={update('firstName')} style={inputStyle} placeholder="Jane" required />
                            </div>
                            <div>
                                <label style={labelStyle}>Last Name</label>
                                <input type="text" value={form.lastName} onChange={update('lastName')} style={inputStyle} placeholder="Doe" required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Email</label>
                            <input type="email" value={form.email} onChange={update('email')} style={inputStyle} placeholder="your@email.com" required />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Phone</label>
                            <input type="tel" value={form.phone} onChange={update('phone')} style={inputStyle} placeholder="(555) 000-0000" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ gridColumn: '1/2' }}>
                                <label style={labelStyle}>City</label>
                                <input type="text" value={form.city} onChange={update('city')} style={inputStyle} placeholder="Atlanta" />
                            </div>
                            <div>
                                <label style={labelStyle}>State</label>
                                <input type="text" value={form.state} onChange={update('state')} style={inputStyle} placeholder="GA" />
                            </div>
                            <div>
                                <label style={labelStyle}>ZIP</label>
                                <input type="text" value={form.zipCode} onChange={update('zipCode')} style={inputStyle} placeholder="30301" />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={labelStyle}>Password</label>
                            <input type="password" value={form.password} onChange={update('password')} style={inputStyle} placeholder="Min. 6 characters" required />
                        </div>

                        <div style={{ marginBottom: '1.75rem' }}>
                            <label style={labelStyle}>Confirm Password</label>
                            <input type="password" value={form.confirmPassword} onChange={update('confirmPassword')} style={inputStyle} placeholder="••••••••" required />
                        </div>

                        <button type="submit" disabled={loading} style={{ ...btnStyle, width: '100%', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', color: '#8b4513', marginTop: '1.5rem', fontSize: '0.95rem' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#b8860b', fontWeight: '600' }}>Sign in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '0.7rem 0.9rem', border: '1.5px solid #e8d5c4', borderRadius: '8px', fontSize: '0.95rem', color: '#2c1a0e', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#8b4513', fontSize: '0.9rem' };

export default Register;
