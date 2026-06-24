import axios from "axios";

// axiosClient.js — Shared Axios configuration
// This is the equivalent of the pg Pool in the backend.
// One configured instance, imported everywhere.

const axiosClient = axios.create({
  // In production, use an environment variable:
  baseURL: import.meta.env.VITE_API_URL, // Your Express server URL
  headers: { "Content-Type": "application/json" }, // All requests send JSON

  timeout: 10000, // 10 second timeout — fail fast, don't hang forever
});

// ── Request Interceptor ─────────────────────────────────────────────────────
// Runs before every request is sent. Used to attach auth tokens.
axiosClient.interceptors.request.use(
  (config) => {
    // When you add JWT authentication later:
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ────────────────────────────────────────────────────
// Runs after every response. Used for centralised error handling.
axiosClient.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    // Axios throws on any 4xx or 5xx response
    const message = error.response?.data?.error || error.message;
    console.error("API Error:", message);
    return Promise.reject(error); // Re-throw so callers can handle it
  },
);

export default axiosClient;
