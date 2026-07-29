import Image from "next/image";

export const metadata = {
  title: "Temporarily Unavailable",
  description: "GLENN website is temporarily unavailable while we make updates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-16 text-white">
      <section className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
          <Image
            src="/logo.png"
            alt="GLENN"
            width={120}
            height={120}
            className="h-24 w-24 rounded-3xl object-cover"
            priority
          />

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c8ff00]">
              Temporary Pause
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              We&apos;ll be back soon.
            </h1>
            <p className="text-sm leading-7 text-white/70 sm:text-base">
              The GLENN website is temporarily unavailable while we make updates.
              Please check back in a little while.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
