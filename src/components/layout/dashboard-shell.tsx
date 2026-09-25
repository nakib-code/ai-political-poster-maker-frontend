"use client";

import type { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/protected-route";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

interface DashboardShellProps {
  children: ReactNode;
  userName?: string;
}

export default function DashboardShell({
  children,
  userName,
}: DashboardShellProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950">
        <Sidebar />

        <div className="lg:pl-64">
          <Navbar userName={userName} />

          <main>{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}