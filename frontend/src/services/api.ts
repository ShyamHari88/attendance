import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost'))
    ? import.meta.env.VITE_API_URL
    : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api'
        : `${window.location.protocol}//${window.location.host}/api`); // Ensures it uses current Railway domain

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error.config?.url?.includes('/login');
        if (error.response?.status === 401 && !isLoginRequest) {
            // Token expired or invalid (only for non-login requests)
            localStorage.removeItem('token');
            localStorage.removeItem('attendease_user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
