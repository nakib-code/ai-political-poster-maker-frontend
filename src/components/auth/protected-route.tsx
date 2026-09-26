"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    isLoading,
    isError,
  } = useAuth();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const isAuthenticated = Boolean(token && !isError && user);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`
      );
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-emerald-400" />

          <p className="mt-3 text-sm text-slate-500">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}