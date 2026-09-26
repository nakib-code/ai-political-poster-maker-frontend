import { Suspense } from "react";

import CreatePosterPage from "./_components/create-poster-page";

function CreatePageLoader() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center">
        <span className="spinner mx-auto block" />

        <p className="mt-4 text-sm text-slate-500">
          Loading poster creator...
        </p>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<CreatePageLoader />}>
      <CreatePosterPage />
    </Suspense>
  );
}