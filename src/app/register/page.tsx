"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";

import Button from "@/components/ui/button";
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

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    if (!formData.email.trim() && !formData.phone.trim()) {
      setError(
        "Please provide at least an email or phone number."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        password: formData.password,
      });

      localStorage.setItem(
        "accessToken",
        response.data.token
      );

      router.replace("/dashboard");
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
          "Registration failed. Please try again."
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
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Start creating professional posters in
              minutes.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name */}
            <div className="form-group">
              <label
                htmlFor="name"
                className="form-label"
              >
                Full name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="form-input pl-11 pr-4"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label
                htmlFor="email"
                className="form-label"
              >
                Email address
                <span className="ml-1 text-xs font-normal text-slate-500">
                  (optional)
                </span>
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="form-input pl-11 pr-4"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label
                htmlFor="phone"
                className="form-label"
              >
                Phone number
                <span className="ml-1 text-xs font-normal text-slate-500">
                  (optional)
                </span>
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  autoComplete="tel"
                  className="form-input pl-11 pr-4"
                />
              </div>

              <p className="text-xs text-slate-500">
                Provide at least an email or phone number.
              </p>
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
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
                !formData.name.trim() ||
                !formData.password ||
                (!formData.email.trim() &&
                  !formData.phone.trim())
              }
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              Sign in
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