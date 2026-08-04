"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import {
  AlertTriangle,
  ArrowRight,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import { createPointCalcAccountBrowserClient } from "@/lib/pointcalc-account-supabase";

type AuthMode = "password" | "google";

export default function DeleteAccountClient() {
  const supabase = useMemo(() => createPointCalcAccountBrowserClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [mode, setMode] = useState<AuthMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void supabase.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;

      if (authError) {
        setError(authError.message);
      }

      setUser(data.user ?? null);
      setBooting(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handlePasswordSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError || !data.user) {
      setError(signInError?.message ?? "Unable to sign in.");
      setLoading(false);
      return;
    }

    setUser(data.user);
    setMessage("Signed in. You can now continue with account deletion.");
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);
    setMessage(null);

    const redirectTo =
      typeof window === "undefined"
        ? undefined
        : `${window.location.origin}/delete-account/callback`;

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (confirmText !== "DELETE") {
      setError('Type "DELETE" exactly to continue.');
      return;
    }

    setDeleting(true);
    setError(null);
    setMessage(null);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.access_token) {
      setError(sessionError?.message ?? "Your session expired. Please sign in again.");
      setDeleting(false);
      return;
    }

    const response = await fetch("/api/delete-account", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    const payload = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setError(payload.message ?? payload.error ?? "Unable to delete your account.");
      setDeleting(false);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setEmail("");
    setPassword("");
    setConfirmText("");
    setMessage(
      payload.message ??
        "Your account deletion request has been completed successfully.",
    );
    setDeleting(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setMessage(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-8 text-black sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 lg:flex-row">
        <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-8 lg:w-[58%]">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">
              Account Deletion
            </p>
            <div className="space-y-3">
              <h1 className="max-w-lg text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Delete your GLENN account
              </h1>
              <p className="max-w-xl text-sm leading-6 text-black/60">
                This page lets you remove your GLENN account access and request
                deletion of linked account data. It is designed for simple,
                direct user control.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["1", "Verify", "Sign in with your existing GLENN account."],
              ["2", "Confirm", 'Type "DELETE" to approve the irreversible action.'],
              ["3", "Remove", "We remove sign-in access and clean linked records."],
            ].map(([step, title, copy]) => (
              <div
                key={step}
                className="rounded-2xl border border-black/10 bg-black/[0.015] p-4"
              >
                <p className="text-xs font-medium text-black/35">{step}</p>
                <h2 className="mt-2 text-sm font-semibold text-black">{title}</h2>
                <p className="mt-2 text-xs leading-5 text-black/55">{copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-black px-5 py-5 text-white">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Permanent action</p>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Account deletion is irreversible. Once completed, the account
                  should no longer be usable for sign-in.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-sm font-medium text-black">What we remove</p>
            <div className="mt-3 grid gap-2 text-sm text-black/60 sm:grid-cols-2">
              {[
                "Authentication access",
                "Profile-linked account records",
                "Social activity and interactions",
                "Chats, stories, and notifications",
                "Wallet and reward-related rows",
                "Tournament and team-builder data",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/8 bg-black/[0.015] px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-8 lg:w-[42%]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-black/40">
                Secure Request
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                Continue
              </h2>
            </div>
            <div className="rounded-2xl border border-black/10 p-2">
              <LockKeyhole className="h-4 w-4 text-black/65" />
            </div>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="mb-4 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-black/75">
              {message}
            </div>
          ) : null}

          {booting ? (
            <div className="flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-3 text-sm text-black/60">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading your session…
            </div>
          ) : user ? (
            <section className="space-y-4">
              <div className="rounded-2xl border border-black/10 bg-black/[0.015] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  Signed In
                </p>
                <p className="mt-2 text-sm font-medium text-black">
                  {user.email ?? "Google account"}
                </p>
                <p className="mt-1 text-xs text-black/50">
                  This deletion request applies to this account.
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 p-4">
                <label
                  htmlFor="delete-confirm"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Type <span className="font-semibold">DELETE</span> to confirm
                </label>
                <input
                  id="delete-confirm"
                  value={confirmText}
                  onChange={(event) => setConfirmText(event.target.value)}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/30"
                  placeholder="DELETE"
                  autoComplete="off"
                />
              </div>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting account…
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete account permanently
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium text-black transition hover:bg-black/[0.02]"
              >
                Sign out
              </button>
            </section>
          ) : (
            <section className="space-y-4">
              <div className="inline-flex rounded-2xl border border-black/10 p-1">
                <button
                  type="button"
                  onClick={() => setMode("password")}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    mode === "password" ? "bg-black text-white" : "text-black/60"
                  }`}
                >
                  Email & password
                </button>
                <button
                  type="button"
                  onClick={() => setMode("google")}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    mode === "google" ? "bg-black text-white" : "text-black/60"
                  }`}
                >
                  Google
                </button>
              </div>

              {mode === "password" ? (
                <form className="space-y-3" onSubmit={handlePasswordSignIn}>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-black">
                      Email
                    </span>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/30"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-black">
                      Password
                    </span>
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/30"
                      placeholder="Your password"
                      autoComplete="current-password"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Sign in to continue
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium text-black transition hover:bg-black/[0.02] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting…
                    </>
                  ) : (
                    <>
                      Continue with Google
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </section>
          )}

          <div className="mt-6 rounded-2xl border border-black/10 bg-black/[0.015] p-4 text-sm leading-6 text-black/60">
            <div className="mb-2 flex items-center gap-2 font-medium text-black">
              <AlertTriangle className="h-4 w-4" />
              Need help instead?
            </div>
            Contact us on{" "}
            <Link
              href="https://wa.me/918492892871?text=Hello%20GLENN%20team"
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Link>{" "}
            if you want support before deleting the account.
          </div>
        </section>
      </div>
    </main>
  );
}
