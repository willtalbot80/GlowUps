import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem',
            gap: '1rem',
        }}>
            <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #e8d5c4',
                borderTop: '4px solid #b8860b',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            {message && (
                <p style={{ color: '#8b4513', fontSize: '0.95rem' }}>{message}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
