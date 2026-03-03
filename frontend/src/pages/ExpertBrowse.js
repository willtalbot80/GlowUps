import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ExpertCard from '../components/ExpertCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API = process.env.REACT_APP_API_URL || '/api';

const SPECIALTIES = ['Makeup', 'Hair', 'Nails', 'Skincare', 'Lashes', 'Brows', 'Waxing', 'Massage'];

const ExpertBrowse = () => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();

    const [filters, setFilters] = useState({ city: '', state: '', specialty: '', maxPrice: '', sortBy: 'name' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setFilters(prev => ({
            ...prev,
            city: params.get('city') || '',
            state: params.get('state') || '',
        }));
    }, [location.search]);

    const fetchExperts = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {};
            if (filters.city) params.city = filters.city;
            if (filters.state) params.state = filters.state;
            if (filters.specialty) params.specialty = filters.specialty;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;

            const res = await axios.get(`${API}/experts`, { params });
            setExperts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setError('Unable to load experts. Please try again.');
            setExperts([]);
        } finally {
            setLoading(false);
        }
    }, [filters.city, filters.state, filters.specialty, filters.maxPrice]);

    useEffect(() => {
        fetchExperts();
    }, [fetchExperts]);

    const sorted = [...experts].sort((a, b) => {
        if (filters.sortBy === 'price_asc') return (a.hourlyRate || 999) - (b.hourlyRate || 999);
        if (filters.sortBy === 'price_desc') return (b.hourlyRate || 0) - (a.hourlyRate || 0);
        return (a.firstName || '').localeCompare(b.firstName || '');
    });

    const inputStyle = {
        width: '100%',
        padding: '0.6rem 0.75rem',
        border: '1.5px solid #e8d5c4',
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#2c1a0e',
        background: '#fff',
        marginBottom: '1rem',
    };

    return (
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#f5e6d3' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                {/* Sidebar Filters */}
                <aside style={{
                    width: '260px',
                    flexShrink: 0,
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(184,134,11,0.1)',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '80px',
                }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2c1a0e', marginBottom: '1.5rem' }}>Filters</h3>

                    <label style={labelStyle}>City</label>
                    <input style={inputStyle} value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Atlanta" />

                    <label style={labelStyle}>State</label>
                    <input style={inputStyle} value={filters.state} onChange={e => setFilters(f => ({ ...f, state: e.target.value }))} placeholder="e.g. GA" />

                    <label style={labelStyle}>Specialty</label>
                    <select style={inputStyle} value={filters.specialty} onChange={e => setFilters(f => ({ ...f, specialty: e.target.value }))}>
                        <option value="">All Specialties</option>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <label style={labelStyle}>Max Price ($/hr)</label>
                    <input style={inputStyle} type="number" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} placeholder="e.g. 150" />

                    <label style={labelStyle}>Sort By</label>
                    <select style={inputStyle} value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
                        <option value="name">Name</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>

                    <button
                        onClick={fetchExperts}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #b8860b, #cd7f32)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.7rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Apply Filters
                    </button>
                </aside>

                {/* Main Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h1 style={{ fontSize: '1.8rem', color: '#2c1a0e', fontFamily: 'Georgia, serif' }}>Browse Experts</h1>
                        <span style={{ color: '#8b4513', fontSize: '0.9rem' }}>
                            {loading ? '...' : `${sorted.length} expert${sorted.length !== 1 ? 's' : ''} found`}
                        </span>
                    </div>

                    {error && (
                        <div style={{ background: '#fef3e8', border: '1px solid #cd7f32', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', color: '#8b4513' }}>
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <LoadingSpinner />
                    ) : sorted.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#8b4513' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <p style={{ fontSize: '1.1rem' }}>No experts found matching your filters.</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try adjusting your search criteria.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {sorted.map(expert => <ExpertCard key={expert._id} expert={expert} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#8b4513', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' };

export default ExpertBrowse;