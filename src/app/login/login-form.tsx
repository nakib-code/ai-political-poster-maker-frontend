"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  LockKeyhole,
  Mail,
  Phone,
} from "lucide-react";

import Button from "@/components/ui/button";
import { loginUser } from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginType, setLoginType] = useState<
    "email" | "phone"
  >("email");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginTypeChange = (
    type: "email" | "phone"
  ) => {
    setLoginType(type);
    setIdentifier("");
    setError("");
  };

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

      const redirect = searchParams.get("redirect");

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
    <main className="auth-page">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-black text-slate-950">
              AI
            </span>

            <span className="text-2xl font-black tracking-tight text-white">
              Poster
              <span className="text-emerald-400">
                Maker
              </span>
            </span>
          </Link>

          <p className="mt-3 text-sm text-slate-400">
            Create professional posters with AI-assisted
            layouts.
          </p>
        </div>

        {/* Card */}
        <div className="auth-card">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue creating posters.
            </p>
          </div>

          {/* Login Type */}
          <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-900 p-1">
            <button
              type="button"
              onClick={() =>
                handleLoginTypeChange("email")
              }
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
              onClick={() =>
                handleLoginTypeChange("phone")
              }
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
            <div className="form-group">
              <label
                htmlFor="identifier"
                className="form-label"
              >
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
                  id="identifier"
                  type={
                    loginType === "email"
                      ? "email"
                      : "tel"
                  }
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(event.target.value)
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
                  className="form-input pl-11 pr-4"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  autoComplete="current-password"
                  className="form-input pl-11 pr-4"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              loading={loading}
              disabled={
                loading ||
                !identifier.trim() ||
                !password
              }
              className="w-full"
            >
              Sign In
            </Button>
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
    </main>
  );
}