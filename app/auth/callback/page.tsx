'use client';

import { useEffect, useState } from 'react';

// This page handles Supabase auth redirects (password reset, email confirmation).
// Supabase redirects here with either:
//   PKCE flow:    ?code=CODE&type=recovery  (or type=signup)
//   Implicit:    #access_token=TOKEN&refresh_token=REFRESH&type=recovery

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'opening' | 'fallback'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Build query string from URL params + fragment
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));

    // Merge: prioritise query params, fall back to hash
    const code = searchParams.get('code') || hashParams.get('code');
    const type = searchParams.get('type') || hashParams.get('type') || 'signup';
    const accessToken = searchParams.get('access_token') || hashParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token') || hashParams.get('refresh_token');
    const expiresIn = searchParams.get('expires_in') || hashParams.get('expires_in');

    if (!code && !accessToken) {
      setErrorMsg('No authentication token found in the link. Please request a new one.');
      setStatus('fallback');
      return;
    }

    // Build the deep-link URL for the app using the custom scheme registered in both platforms
    // Android: see intent-filter for scheme="glenn"
    // iOS:     see CFBundleURLSchemes in Info.plist
    const appParams = new URLSearchParams();
    if (code) appParams.set('code', code);
    if (accessToken) appParams.set('access_token', accessToken);
    if (refreshToken) appParams.set('refresh_token', refreshToken);
    if (expiresIn) appParams.set('expires_in', expiresIn);
    appParams.set('type', type);

    const appDeepLink = `glenn://auth/callback?${appParams.toString()}`;

    setStatus('opening');

    // Attempt to open the app
    window.location.href = appDeepLink;

    // If the app isn't installed after a short delay, show fallback
    const timer = setTimeout(() => {
      setStatus('fallback');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <img
        src="/logos.svg"
        alt="Glenn"
        className="h-12 invert mb-10"
      />

      {status === 'loading' && (
        <p className="text-gray-400 text-sm animate-pulse">Verifying your link…</p>
      )}

      {status === 'opening' && (
        <>
          <h1 className="text-white text-xl font-semibold mb-3">Opening Glenn…</h1>
          <p className="text-gray-400 text-sm max-w-xs">
            If the app doesn&apos;t open automatically, make sure Glenn is installed on your device.
          </p>
          <div className="mt-6 h-1 w-40 rounded-full bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-[#c8ff00]"
              style={{ width: '100%', animation: 'progress 2.5s linear forwards' }}
            />
          </div>
        </>
      )}

      {status === 'fallback' && (
        <>
          {errorMsg ? (
            <>
              <h1 className="text-white text-xl font-semibold mb-3">Invalid Link</h1>
              <p className="text-red-400 text-sm max-w-xs">{errorMsg}</p>
            </>
          ) : (
            <>
              <h1 className="text-white text-xl font-semibold mb-3">Glenn not found</h1>
              <p className="text-gray-400 text-sm max-w-xs mb-6">
                Please install the Glenn app and then open this link again.
              </p>
              <a
                href="https://github.com/anshxs/glenn_frontend/releases/download/v1.0.0/app-release.apk"
                className="inline-flex items-center gap-2 rounded-lg bg-[#c8ff00] px-6 py-3 text-black font-semibold text-sm hover:scale-105 transition-transform"
              >
                Download Glenn
              </a>
            </>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
