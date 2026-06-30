import axios from "axios";

// axiosClient.js — Shared Axios configuration
// This is the equivalent of the pg Pool in the backend.
// One configured instance, imported everywhere.

const axiosClient = axios.create({
  // In production, use an environment variable:
  baseURL: import.meta.env.VITE_API_URL, // Your Express server URL
  headers: { "Content-Type": "application/json" }, // All requests send JSON

  timeout: 60000, // 60 second timeout — free tier render, takes while to load
});

// ── Response Interceptor ─────────────────────────────────────────────────────
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.isColdStart = true;
      error.friendlyMessage =
        "The server is waking up — this can take up to a minute on first load. Please try again shortly.";
    } else {
      error.friendlyMessage = error.response?.data?.error || error.message;
    }

    console.error("API Error:", error.friendlyMessage);
    return Promise.reject(error);
  },
);

export default axiosClient;
