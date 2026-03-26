import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms" },
  { href: "/deposit-policy", label: "Deposit" },
  { href: "/refund-policy", label: "Refund" },
  { href: "/withdrawal-policy", label: "Withdrawal" },
];

const downloadHref =
  "https://github.com/anshxs/glenn_frontend/releases/download/v1.0.0/app-release.apk";

export function SiteFooter() {
  return (
    <footer className="glass-footer">
      <div className="glass-footer__top">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            GLENN Esports
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
            Liquid glass around a serious Free Fire platform.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/68">
            Tournaments, squads, profiles, and rewards wrapped in a cleaner,
            more fluid website experience.
          </p>
        </div>

        <a
          href={downloadHref}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button glass-button--accent"
        >
          Download GLENN
        </a>
      </div>

      <div className="glass-footer__bottom">
        <p className="text-sm text-white/55">
          © {new Date().getFullYear()} GLENN. Built for India&apos;s Free Fire
          community.
        </p>

        <nav className="glass-footer__links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
