'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Status = 'opening' | 'fallback';

export default function ProfileRedirectClient({
  username,
}: {
  username: string;
}) {
  const normalizedUsername = username.startsWith('@')
    ? username
    : `@${username}`;
  const isValid = normalizedUsername.length > 1;
  const [status, setStatus] = useState<Status>('opening');

  const profileUrl = useMemo(
    () => `https://glennesports.app/${normalizedUsername}`,
    [normalizedUsername],
  );

  useEffect(() => {
    if (!isValid) return;

    const deepLink = `glenn://profile/${normalizedUsername}`;
    window.location.href = deepLink;

    const timer = window.setTimeout(() => {
      setStatus('fallback');
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [isValid, normalizedUsername]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <Image
          src="/logos.svg"
          alt="Glenn"
          width={140}
          height={40}
          className="mx-auto mb-8 h-10 w-auto invert"
        />
        {isValid && status === 'opening' ? (
          <>
            <h1 className="text-2xl font-semibold">Opening profile…</h1>
            <p className="mt-3 text-sm text-white/60">
              Trying to open this Glenn profile in the app.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">Glenn not found</h1>
            <p className="mt-3 text-sm text-white/60">
              If the app did not open automatically, please install Glenn and open the profile link again.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
              >
                Download Glenn
              </a>
              <p className="text-xs text-white/40 break-all">{profileUrl}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
