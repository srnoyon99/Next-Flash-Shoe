'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {error?.message || 'An unexpected error occurred while loading this page.'}
      </p>
      {error?.digest && (
        <p className="text-xs text-gray-500">Reference: {error.digest}</p>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={() => unstable_retry()}
          className="rounded-lg border border-red-700 bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
