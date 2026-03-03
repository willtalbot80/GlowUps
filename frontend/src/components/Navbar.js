import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        await logout();
        history.push('/');
    };

    const dashboardPath = currentUser
        ? currentUser.userType === 'expert' ? '/dashboard/expert' : '/dashboard/client'
        : '/login';

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: 'rgba(245, 230, 211, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(184, 134, 11, 0.2)',
            padding: '0.8rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Link to="/" style={{
                fontSize: '1.6rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                fontFamily: 'Georgia, serif',
                textDecoration: 'none',
            }}>
                ✨ GlowUps
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link to="/" style={navLinkStyle}>Home</Link>
                <Link to="/browse" style={navLinkStyle}>Browse Experts</Link>

                {currentUser ? (
                    <>
                        <Link to={dashboardPath} style={navLinkStyle}>Dashboard</Link>
                        <button onClick={handleLogout} style={btnStyle}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={navLinkStyle}>Login</Link>
                        <Link to="/register">
                            <button style={btnStyle}>Get Started</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const navLinkStyle = {
    color: '#8b4513',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
};

const btnStyle = {
    background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1.25rem',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'transform 0.2s',
};

export default Navbar;
