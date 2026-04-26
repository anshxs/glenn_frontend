'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Status = 'opening' | 'fallback';

export default function PostRedirectClient({ postId }: { postId: string }) {
  const isValidPostId =
    postId.length > 0 && postId !== 'undefined' && postId !== 'null';
  const [status, setStatus] = useState<Status>('opening');

  const postUrl = useMemo(
    () => `https://glennesports.app/post/${postId}`,
    [postId],
  );

  useEffect(() => {
    if (!isValidPostId) {
      return;
    }

    const deepLink = `glenn://post/${postId}`;
    window.location.href = deepLink;

    const timer = window.setTimeout(() => {
      setStatus('fallback');
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [isValidPostId, postId]);

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
        {isValidPostId && status === 'opening' ? (
          <>
            <h1 className="text-2xl font-semibold">Opening post…</h1>
            <p className="mt-3 text-sm text-white/60">
              Trying to open this Glenn post in the app.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">Glenn not found</h1>
            <p className="mt-3 text-sm text-white/60">
              If the app did not open automatically, please install Glenn and open the post link again.
            </p>
            <div className="mt-6 flex flex-col gap-3">
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
