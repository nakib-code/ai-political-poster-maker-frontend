import { Suspense } from "react";

import CreatePosterPage from "./create-poster-page";

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="page-container">
          <div className="card flex min-h-[300px] items-center justify-center">
            <span className="spinner" />
          </div>
        </div>
      }
    >
      <CreatePosterPage />
    </Suspense>
  );
}