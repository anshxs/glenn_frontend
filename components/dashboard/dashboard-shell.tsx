"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IndianRupee, LayoutGrid, Menu, ShieldCheck, Swords, User, X } from "lucide-react";
import type { DashboardProfile, DashboardSectionKey } from "@/lib/dashboard-permissions";

const sectionMeta: Record<
  DashboardSectionKey,
  { label: string; href: string; icon: React.ComponentType<{ className?: string }> }
> = {
  guild_management: {
    label: "Guild Management",
    href: "/dashboard/guild-management",
    icon: Swords,
  },
  finance: {
    label: "Finances",
    href: "/dashboard/finance",
    icon: IndianRupee,
  },
  staff_management: {
    label: "Staff Management",
    href: "/dashboard/staff-management",
    icon: ShieldCheck,
  },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type DashboardShellProps = {
  children: React.ReactNode;
  profile: DashboardProfile;
  availableSections: DashboardSectionKey[];
  onLogout: () => void;
  title: string;
  subtitle: string;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (value: boolean) => void;
};

export function DashboardShell({
  children,
  profile,
  availableSections,
  onLogout,
  title,
  subtitle,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: DashboardShellProps) {
  const pathname = usePathname();
  const profileInitial = (profile.name || profile.email || "G").trim().charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-black">
      <header className="sticky top-0 z-30 bg-[#f7f7f2]">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl text-white">
              <img src="/logos.svg" alt="GLENN Logo" className="h-auto w-28 object-contain" />
            </div>
            {/* <div>
              <p className="text-sm font-semibold text-black">GLENN Dashboard</p>
              <p className="text-xs text-black/45">{subtitle}</p>
            </div> */}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              href="/dashboard/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black border border-black/10"
              aria-label="Open profile"
            >
              {profileInitial}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] gap-4 px-4 py-4 sm:px-6">
        {mobileSidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/35 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        ) : null}

        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-full w-[290px] border-r border-black/8 bg-white p-4 transition lg:sticky lg:top-4 lg:block lg:h-[calc(100vh-6rem)] lg:w-[280px] lg:self-start lg:overflow-y-auto lg:rounded-4xl lg:border lg:border-black/10",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="flex items-center justify-between lg:hidden">
            <p className="text-sm font-semibold text-black">Menu</p>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-0 border-black/10"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#f6f7f2] p-4">
            <p className="text-base font-semibold text-black">{profile.name || "GLENN Staff"}</p>
            <p className="mt-1 truncate text-sm text-black/55">{profile.email}</p>
          </div>
          <nav className="mt-4 space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                pathname === "/dashboard"
                  ? "bg-black text-white"
                  : "text-black/70 hover:bg-[#f6f7f2] hover:text-black",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </Link>

            {availableSections.map((section) => {
              const item = sectionMeta[section];
              const Icon = item.icon;

              return (
                <Link
                  key={section}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                    pathname === item.href
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-[#f6f7f2] hover:text-black",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/dashboard/profile"
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                pathname === "/dashboard/profile"
                  ? "bg-black text-white"
                  : "text-black/70 hover:bg-[#f6f7f2] hover:text-black",
              )}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>

          <button
            type="button"
            onClick={onLogout}
            className="mt-6 bg-red-100 inline-flex h-10 w-full items-center justify-center rounded-xl text-sm text-red-700 transition hover:bg-red-500 hover:text-white"
          >
            Sign out
          </button>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="rounded-4xl border border-black/10 bg-white p-5 sm:p-6 lg:min-h-[calc(100vh-6rem)]">
            <div className="border-b border-black/8 pb-4">
              <h1 className="text-xl font-semibold text-black">{title}</h1>
              {/* <p className="mt-1 text-sm text-black/50">{subtitle}</p> */}
            </div>
            <div className="pt-2">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
