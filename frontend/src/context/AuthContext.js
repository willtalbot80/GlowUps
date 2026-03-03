import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('glowups_token');
        const userStr = localStorage.getItem('glowups_user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                setCurrentUser(user);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (e) {
                localStorage.removeItem('glowups_token');
                localStorage.removeItem('glowups_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
        const { token, user } = res.data;
        localStorage.setItem('glowups_token', token);
        localStorage.setItem('glowups_user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setCurrentUser(user);
        return user;
    };

    const register = async (formData) => {
        const res = await axios.post(`${API_BASE}/auth/register`, formData);
        const { token, user } = res.data;
        localStorage.setItem('glowups_token', token);
        localStorage.setItem('glowups_user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setCurrentUser(user);
        return user;
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE}/auth/logout`);
        } catch (e) {
            // ignore
        }
        localStorage.removeItem('glowups_token');
        localStorage.removeItem('glowups_user');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    const updateUser = (updated) => {
        const merged = { ...currentUser, ...updated };
        setCurrentUser(merged);
        localStorage.setItem('glowups_user', JSON.stringify(merged));
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
