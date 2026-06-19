"use client";

import { useState } from "react";
import { DashboardLogin } from "@/components/dashboard/dashboard-login";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useDashboardAuth } from "@/components/dashboard/dashboard-auth-context";

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-black/40">{label}</p>
      <p className="mt-2 text-sm text-black">{value}</p>
    </div>
  );
}

export default function DashboardProfilePage() {
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

  const sections = auth.availableSections.length
    ? auth.availableSections.map((section) => section.replaceAll("_", " ")).join(", ")
    : "No sections assigned";

  return (
    <DashboardShell
      profile={auth.profile}
      availableSections={auth.availableSections}
      onLogout={auth.handleLogout}
      title="Profile"
      subtitle="Your employee account details."
      mobileSidebarOpen={mobileSidebarOpen}
      setMobileSidebarOpen={setMobileSidebarOpen}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard label="Name" value={auth.profile.name || "Not added"} />
        <InfoCard label="Email" value={auth.profile.email} />
        <InfoCard label="Phone" value={auth.profile.phone || "Not added"} />
        <InfoCard label="Sections" value={sections} />
      </div>
    </DashboardShell>
  );
}
