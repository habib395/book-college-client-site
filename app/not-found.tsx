"use client";

import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Ghost className="w-24 h-24 text-emerald-600 animate-bounce" />
        </div>
        <h1 className="text-6xl font-extrabold text-emerald-700">404</h1>
        <p className="text-xl text-gray-700">Oops! Page not found.</p>
        <p className="text-gray-500">The page you're looking for doesn’t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}