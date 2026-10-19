// ServerStatusBanner.jsx — Lets visitors know when the free-tier backend is
// cold-starting, shows an estimated countdown, and pops a toast once it's live.

import { useEffect, useState } from "react";
import { useBackendWarmup, WARMUP_ESTIMATE } from "../hooks/useBackendWarmup";
import { useLibrary } from "../context/LibraryContext";

function ServerStatusBanner() {
  const { status, secondsLeft, wokeUp } = useBackendWarmup();
  const { booksError, usersError, loadBooks, loadUsers } = useLibrary();
  const [toastDismissed, setToastDismissed] = useState(false);
  const showToast = wokeUp && !toastDismissed;

  // Once the server wakes up: retry any requests that failed while it was
  // asleep, and auto-hide the toast after a few seconds.
  useEffect(() => {
    if (!wokeUp) return;
    if (booksError) loadBooks();
    if (usersError) loadUsers();
    const timer = setTimeout(() => setToastDismissed(true), 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wokeUp]);

  const progress = ((WARMUP_ESTIMATE - secondsLeft) / WARMUP_ESTIMATE) * 100;

  return (
    <>
      {status === "waking" && (
        <div className="bg-[#1E293B] border-b border-amber-500/40">
          <div className="max-w-6xl mx-auto px-8 py-3 flex items-center gap-3 text-sm text-amber-200">
            <span className="h-4 w-4 shrink-0 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
            <p>
              Waking up the server (free hosting) —{" "}
              {secondsLeft > 0
                ? `ready in about ${secondsLeft}s.`
                : "almost there…"}{" "}
              <span className="text-slate-400">
                You'll get a notification when it's ready.
              </span>
            </p>
          </div>
          <div className="h-0.5 bg-[#334155]">
            <div
              className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {showToast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border border-emerald-500/40 bg-[#1E293B] px-4 py-3 text-sm text-emerald-200 shadow-lg"
        >
          <span>✅ Server is live — you can try now!</span>
          <button
            onClick={() => setToastDismissed(true)}
            className="text-slate-400 hover:text-white"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

export default ServerStatusBanner;
