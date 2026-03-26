import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms" },
];

type LandingHeaderProps = {
  activeHref?: string;
};

export function LandingHeader({ activeHref }: LandingHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[rgba(10,10,10,0.38)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos.svg"
            alt="GLENN"
            width={44}
            height={44}
            className="h-auto w-40 -ml-4 rounded-xl object-cover invert-100"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition ${
                  isActive ? "text-white" : "text-white/[0.72] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 list-none items-center justify-center rounded-full border border-white/[0.15] bg-white/5 text-white/80 transition hover:bg-white/10 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </summary>

          <div className="absolute right-0 top-14 w-48 rounded-3xl border border-white/10 bg-[#0a0a0a]/95 p-3 shadow-2xl shadow-black/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl px-4 py-3 text-sm transition hover:bg-white/[0.08] hover:text-white ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
