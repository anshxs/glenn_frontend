'use client';

import { useEffect } from 'react';

export default function PaymentCallbackPage() {
  useEffect(() => {
    // Attempt to open the app via deep link
    window.location.href = 'glenn://payment/callback';

    // Fallback: close the tab/window after a short delay
    // (in case the deep link opens the app successfully, this won't matter)
    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-green-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2">Payment Complete</h1>
        <p className="text-gray-400 text-sm">Redirecting you back to the Glenn app…</p>
      </div>
      <a
        href="glenn://payment/callback"
        className="mt-4 px-6 py-3 bg-white text-black rounded-full text-sm font-semibold"
      >
        Return to App
      </a>
    </div>
  );
}
