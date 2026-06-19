"use client";

import { DashboardAuthProvider } from "@/components/dashboard/dashboard-auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardAuthProvider>{children}</DashboardAuthProvider>;
}
