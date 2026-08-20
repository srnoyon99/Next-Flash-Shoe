'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-gray-600">
          {error?.message || 'An unexpected error occurred.'}
        </p>
        {error?.digest && <p className="text-xs text-gray-500">Reference: {error.digest}</p>}
        <button
          onClick={() => unstable_retry()}
          className="rounded-lg border border-red-700 bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
