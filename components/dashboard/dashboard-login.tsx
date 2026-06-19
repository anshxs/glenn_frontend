"use client";

type DashboardLoginProps = {
  booting: boolean;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/25",
        props.className,
      )}
    />
  );
}

export function DashboardLogin(props: DashboardLoginProps) {
  const { booting, email, setEmail, password, setPassword, error, loading, onSubmit } = props;

  return (
    <main className="min-h-screen bg-[#f7f7f2] px-4 py-8 text-black sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center">
        <div className="w-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45">
            Glenn Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">Sign in</h1>
          <p className="mt-2 text-sm text-black/55">
            Open your employee workspace.
          </p>

          {booting ? (
            <div className="mt-6 flex items-center justify-center rounded-xl border border-black/10 bg-[#fafaf7] px-4 py-10">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            </div>
          ) : (
            <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
              <Field
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
              <Field
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
