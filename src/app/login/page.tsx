import { Suspense } from "react";

import LoginForm from "./login-form";

function LoginPageLoader() {
  return (
    <main className="auth-page">
      <div className="text-center">
        <span className="spinner mx-auto block" />

        <p className="mt-4 text-sm text-slate-500">
          Loading login...
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoader />}>
      <LoginForm />
    </Suspense>
  );
}