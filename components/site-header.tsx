import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms" },
];

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";

export function SiteHeader() {
  return (
    <header className="glass-nav">
      <div className="glass-nav__inner">
        <Link href="/" className="glass-brand">
          <Image
            src="/logo.png"
            alt="GLENN"
            width={44}
            height={44}
            className="h-11 w-11 rounded-2xl object-cover"
            priority
          />
          <span className="text-lg font-black uppercase tracking-[0.28em] text-white sm:text-xl">
            GLENN
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="glass-nav__links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button glass-button--accent"
          >
            Download App
          </a>
        </div>

        <details className="glass-menu md:hidden">
          <summary>
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

          <div className="glass-menu__panel">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="glass-menu__link">
                {link.label}
              </Link>
            ))}

            <a
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button glass-button--accent w-full justify-center"
            >
              Download App
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
