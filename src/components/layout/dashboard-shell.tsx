"use client";

import { useState, type ReactNode } from "react";

import { useAuth } from "@/hooks/use-auth";

import ProtectedRoute from "@/components/auth/protected-route";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: user } = useAuth();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Sidebar
          open={sidebarOpen}
          onClose={closeSidebar}
        />

        <div className="min-h-screen lg:pl-64">
          <Navbar
            userName={user?.name}
            onMenuClick={toggleSidebar}
          />

          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}