import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LocationSearch = ({ onSearch, initialValues = {} }) => {
    const [city, setCity] = useState(initialValues.city || '');
    const [state, setState] = useState(initialValues.state || '');
    const [zip, setZip] = useState(initialValues.zip || '');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await res.json();
                    const addr = data.address || {};
                    setCity(addr.city || addr.town || addr.village || '');
                    setState(addr.state || '');
                    setZip(addr.postcode || '');
                } catch (e) {
                    // silently fail, just use coords
                }
                setLoading(false);
            },
            () => {
                setLoading(false);
                alert('Unable to retrieve your location');
            }
        );
    };

    const handleSearch = () => {
        const params = { city, state, zip };
        if (onSearch) {
            onSearch(params);
        } else {
            const query = new URLSearchParams();
            if (city) query.set('city', city);
            if (state) query.set('state', state);
            if (zip) query.set('zip', zip);
            history.push(`/browse?${query.toString()}`);
        }
    };

    return (
        <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            padding: '0.6rem 1rem',
            boxShadow: '0 4px 20px rgba(184, 134, 11, 0.15)',
            border: '1px solid rgba(184, 134, 11, 0.2)',
        }}>
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                style={inputStyle}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <input
                type="text"
                placeholder="State"
                value={state}
                onChange={e => setState(e.target.value)}
                style={{ ...inputStyle, width: '80px' }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <input
                type="text"
                placeholder="ZIP"
                value={zip}
                onChange={e => setZip(e.target.value)}
                style={{ ...inputStyle, width: '90px' }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button
                onClick={handleGeolocate}
                disabled={loading}
                title="Use my location"
                style={{
                    background: 'none',
                    border: '1px solid #b8860b',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#b8860b',
                    flexShrink: 0,
                }}
            >
                {loading ? '⏳' : '📍'}
            </button>
            <button
                onClick={handleSearch}
                style={{
                    background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    flexShrink: 0,
                }}
            >
                Search
            </button>
        </div>
    );
};

const inputStyle = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '0.95rem',
    color: '#2c1a0e',
    padding: '0.3rem 0.5rem',
    width: '130px',
};

export default LocationSearch;
