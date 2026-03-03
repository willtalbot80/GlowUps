import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const AppointmentConfirmation = () => {
    const location = useLocation();
    const history = useHistory();
    const { appointment, expert } = location.state || {};

    if (!appointment) {
        return (
            <div style={{ paddingTop: '80px', textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#8b4513' }}>No appointment data found.</p>
                <button onClick={() => history.push('/browse')} style={btnStyle}>Browse Experts</button>
            </div>
        );
    }

    const expertName = expert ? `${expert.firstName || ''} ${expert.lastName || ''}`.trim() : 'Expert';
    const depositAmount = expert?.hourlyRate ? Math.round(expert.hourlyRate * 0.2) : 25;

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 1.5rem' }}>
            <div style={{ maxWidth: '560px', width: '100%', background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(184,134,11,0.15)' }}>
                {/* Success banner */}
                <div style={{ background: 'linear-gradient(135deg, #b8860b, #cd7f32)', padding: '2rem', textAlign: 'center', color: '#fff' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>Booking Confirmed!</h1>
                    <p style={{ opacity: 0.9 }}>Your appointment has been submitted</p>
                </div>

                <div style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '1.25rem' }}>Appointment Details</h2>

                    {[
                        { label: 'Expert', value: expertName },
                        { label: 'Service', value: appointment.service },
                        { label: 'Date', value: appointment.date },
                        { label: 'Time', value: appointment.time },
                        { label: 'Duration', value: `${appointment.duration} minutes` },
                        { label: 'Location', value: appointment.location || 'To be confirmed' },
                        { label: 'Status', value: appointment.status || 'Pending' },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #f5e6d3' }}>
                            <span style={{ color: '#8b4513', fontSize: '0.9rem' }}>{label}</span>
                            <span style={{ color: '#2c1a0e', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                        </div>
                    ))}

                    <div style={{ background: '#f5e6d3', borderRadius: '12px', padding: '1.25rem', margin: '1.5rem 0' }}>
                        <p style={{ color: '#2c1a0e', fontWeight: '700', marginBottom: '0.4rem' }}>💳 Deposit Required</p>
                        <p style={{ color: '#6b4226', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                            A deposit of <strong style={{ color: '#b8860b' }}>${depositAmount}</strong> is required to secure your booking.
                        </p>
                        <button
                            onClick={() => history.push(`/deposit/${appointment._id}`, { appointment, expert, depositAmount })}
                            style={{ ...btnStyle, width: '100%' }}
                        >
                            Pay Deposit — ${depositAmount}
                        </button>
                    </div>

                    <button
                        onClick={() => history.push('/dashboard/client')}
                        style={{ ...outlineBtn, width: '100%' }}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

const btnStyle = { background: 'linear-gradient(135deg, #b8860b, #cd7f32)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' };
const outlineBtn = { background: 'none', color: '#b8860b', border: '2px solid #b8860b', padding: '0.75rem 2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', marginTop: '0.75rem' };

export default AppointmentConfirmation;
