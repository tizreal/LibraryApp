// useBackendWarmup.js — Detects a cold Render backend and tracks its wake-up.
// Pings the API on load (which also wakes the server), and if it is slow
// to answer, keeps polling until it responds so the UI can show a countdown.

import { useEffect, useState } from "react";

const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
// Use an endpoint the app already calls, so it's guaranteed to exist and be
// covered by the backend's CORS config.
const HEALTH_PATH = "/api/books";
export const WARMUP_ESTIMATE = 50; // seconds — typical Render free-tier cold start
const SLOW_AFTER = 2000; // ms before we assume the server is asleep
const PING_TIMEOUT = 5000; // ms per health-check attempt
const POLL_INTERVAL = 3000; // ms between attempts

async function ping() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), PING_TIMEOUT);
  try {
    const res = await fetch(`${API}${HEALTH_PATH}`, { signal: ctrl.signal });
    // Any non-5xx reply means the app itself answered. Render's proxy returns
    // 502/503 while the instance is still spinning up.
    return res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// status: "checking" (first ping in flight) | "waking" (cold start) | "ready"
// wokeUp: true when the server went from waking → ready (used for the toast)
export function useBackendWarmup() {
  const [status, setStatus] = useState("checking");
  const [secondsLeft, setSecondsLeft] = useState(WARMUP_ESTIMATE);
  const [wokeUp, setWokeUp] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let wasSlow = false;
    let countdown;

    const slowTimer = setTimeout(() => {
      if (cancelled) return;
      wasSlow = true;
      setStatus("waking");
      countdown = setInterval(
        () => setSecondsLeft((s) => Math.max(0, s - 1)),
        1000,
      );
    }, SLOW_AFTER);

    (async () => {
      while (!cancelled) {
        if (await ping()) {
          if (cancelled) return;
          clearTimeout(slowTimer);
          clearInterval(countdown);
          setStatus("ready");
          setWokeUp(wasSlow);
          return;
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL));
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
      clearInterval(countdown);
    };
  }, []);

  return { status, secondsLeft, wokeUp };
}
