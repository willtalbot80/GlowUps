import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const history = useHistory();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            if (user.userType === 'expert') {
                history.push('/dashboard/expert');
            } else {
                history.push('/dashboard/client');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            paddingTop: '64px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5e6d3, #e8d5c4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 1.5rem',
        }}>
            <div style={{ maxWidth: '440px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#2c1a0e', fontFamily: 'Georgia, serif' }}>
                        Welcome Back ✨
                    </h1>
                    <p style={{ color: '#8b4513', marginTop: '0.5rem' }}>Sign in to your GlowUps account</p>
                </div>

                <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 8px 40px rgba(184,134,11,0.12)' }}>
                    {error && <div style={errorStyle}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={labelStyle}>Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                style={inputStyle}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1.75rem' }}>
                            <label style={labelStyle}>Password</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                style={inputStyle}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading} style={{ ...btnStyle, width: '100%', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', color: '#8b4513', marginTop: '1.5rem', fontSize: '0.95rem' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#b8860b', fontWeight: '600' }}>Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e8d5c4', borderRadius: '8px', fontSize: '1rem', color: '#2c1a0e', background: '#fff' };
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.9rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' };
const errorStyle = { background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#8b4513', fontSize: '0.9rem' };

export default Login;
