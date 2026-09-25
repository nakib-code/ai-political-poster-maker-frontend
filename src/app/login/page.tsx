import { Suspense } from "react";
import LoginForm from "./login-form";


export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950">
          <div className="text-sm text-slate-500">
            Loading...
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}