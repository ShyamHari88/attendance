import axios from 'axios';

// In production, VITE_API_URL must be set in Vercel environment variables
// pointing to your backend (Railway / Render / etc.)
// e.g. VITE_API_URL=https://your-backend.railway.app/api
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : isLocalhost
        ? 'http://localhost:5000/api'
        : (() => {
            console.error(
                '[API] VITE_API_URL is not set! ' +
                'Add it to Vercel → Project → Settings → Environment Variables. ' +
                'Falling back to localhost (will fail in production).'
            );
            return 'http://localhost:5000/api';
        })();

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
