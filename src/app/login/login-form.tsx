"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
} from "lucide-react";

import { loginUser } from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginType, setLoginType] = useState<
    "email" | "phone"
  >("email");

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        ...(loginType === "email"
          ? { email: identifier.trim() }
          : { phone: identifier.trim() }),
        password,
      });

      localStorage.setItem(
        "accessToken",
        response.data.token
      );

      const redirect =
        searchParams.get("redirect");

      const safeRedirect =
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//")
          ? redirect
          : "/dashboard";

      router.replace(safeRedirect);
    } catch (err: unknown) {
      const axiosError = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      setError(
        axiosError.response?.data?.message ||
          "Login failed. Please check your information."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-black"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg text-slate-950">
                AI
              </span>

              <span>
                Poster
                <span className="text-emerald-400">
                  Maker
                </span>
              </span>
            </Link>

            <p className="mt-3 text-sm text-slate-400">
              Create professional posters with
              AI-assisted layouts.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Sign in to continue creating
                posters.
              </p>
            </div>

            {/* Login Type */}
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginType("email");
                  setIdentifier("");
                  setError("");
                }}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  loginType === "email"
                    ? "bg-white text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Email
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginType("phone");
                  setIdentifier("");
                  setError("");
                }}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  loginType === "phone"
                    ? "bg-white text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Phone
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email / Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  {loginType === "email"
                    ? "Email address"
                    : "Phone number"}
                </label>

                <div className="relative">
                  {loginType === "email" ? (
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  )}

                  <input
                    type={
                      loginType === "email"
                        ? "email"
                        : "tel"
                    }
                    value={identifier}
                    onChange={(event) =>
                      setIdentifier(
                        event.target.value
                      )
                    }
                    placeholder={
                      loginType === "email"
                        ? "you@example.com"
                        : "01XXXXXXXXX"
                    }
                    required
                    autoComplete={
                      loginType === "email"
                        ? "email"
                        : "tel"
                    }
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  loading ||
                  !identifier.trim() ||
                  !password
                }
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Create account
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-600">
            AI Political Poster Maker
          </p>
        </div>
      </div>
    </main>
  );
}