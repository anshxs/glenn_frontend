'use client';

import { useEffect, useMemo, useState } from 'react';

type Status = 'opening' | 'fallback';

export default function PostLinkPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = params.id;
  const [status, setStatus] = useState<Status>('opening');

  const postUrl = useMemo(
    () => `https://glennesports.app/post/${postId}`,
    [postId],
  );

  useEffect(() => {
    const deepLink = `glenn://post/${postId}`;
    window.location.href = deepLink;

    const timer = window.setTimeout(() => {
      setStatus('fallback');
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [postId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <img src="/logos.svg" alt="Glenn" className="mx-auto mb-8 h-10 invert" />
        {status === 'opening' ? (
          <>
            <h1 className="text-2xl font-semibold">Opening post…</h1>
            <p className="mt-3 text-sm text-white/60">
              Trying to open this Glenn post in the app.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">Open this post in Glenn</h1>
            <p className="mt-3 text-sm text-white/60">
              If the app did not open automatically, use the button below or install Glenn first.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`glenn://post/${postId}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Open in App
              </a>
              <a
                href="https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
              >
                Download Glenn
              </a>
              <p className="text-xs text-white/40 break-all">{postUrl}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
