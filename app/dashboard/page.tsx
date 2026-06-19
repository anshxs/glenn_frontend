"use client";

import { useState } from "react";
import { DashboardLogin } from "@/components/dashboard/dashboard-login";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useDashboardAuth } from "@/components/dashboard/dashboard-auth-context";

export default function DashboardPage() {
  const auth = useDashboardAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!auth.profile) {
    return (
      <DashboardLogin
        booting={auth.booting}
        email={auth.email}
        setEmail={auth.setEmail}
        password={auth.password}
        setPassword={auth.setPassword}
        error={auth.error}
        loading={auth.loading}
        onSubmit={auth.handleLogin}
      />
    );
  }

  return (
    <DashboardShell
      profile={auth.profile}
      availableSections={auth.availableSections}
      onLogout={auth.handleLogout}
      title="Dashboard"
      subtitle="Main screen is ready for the next modules."
      mobileSidebarOpen={mobileSidebarOpen}
      setMobileSidebarOpen={setMobileSidebarOpen}
    >
      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-black/10 bg-[#fafaf7]">
        <div className="text-center">
          <p className="text-base font-medium text-black">Dashboard Home</p>
          <p className="mt-2 text-sm text-black/50">
            Empty for now. Use the sidebar to open a section.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
