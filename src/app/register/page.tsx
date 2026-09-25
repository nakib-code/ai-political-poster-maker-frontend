"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        password: formData.password,
      });

      localStorage.setItem(
        "accessToken",
        response.data.token
      );

      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
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
                Poster<span className="text-emerald-400">Maker</span>
              </span>
            </Link>

            <p className="mt-3 text-sm text-slate-400">
              Create professional posters with AI-assisted layouts.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Start creating professional posters in minutes.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Full name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    minLength={2}
                    maxLength={100}
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Email address
                  <span className="ml-1 text-xs text-slate-500">
                    (optional)
                  </span>
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Phone number
                  <span className="ml-1 text-xs text-slate-500">
                    (optional)
                  </span>
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              <p className="-mt-2 text-xs text-slate-500">
                Provide at least an email or phone number.
              </p>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Sign in
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