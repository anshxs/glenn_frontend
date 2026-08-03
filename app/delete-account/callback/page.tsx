"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { createPointCalcAccountBrowserClient } from "@/lib/pointcalc-account-supabase";

export default function DeleteAccountCallbackPage() {
  const supabase = useMemo(() => createPointCalcAccountBrowserClient(), []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function completeCallback() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (!code) {
        if (active) {
          setError("Missing Google sign-in code.");
        }
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        if (active) {
          setError(exchangeError.message);
        }
        return;
      }

      window.location.replace("/delete-account");
    }

    void completeCallback();

    return () => {
      active = false;
    };
  }, [supabase]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-black">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {error ? (
          <>
            <h1 className="text-xl font-semibold tracking-[-0.03em]">
              Sign-in failed
            </h1>
            <p className="mt-3 text-sm leading-6 text-black/60">{error}</p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/10">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <h1 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
              Completing sign-in…
            </h1>
            <p className="mt-3 text-sm leading-6 text-black/60">
              Please wait while we return you to account deletion.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
