"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-400">
      <ul className="flex justify-between items-center gap-4 px-10 py-4">
        <Link
          href="/Home"
          className="hover:text-gray-200 transition duration-300 block"
        >
          Home
        </Link>
        <Link
          href="/colleges"
          className="hover:text-gray-200 transition duration-300 block"
        >
          College
        </Link>
        <Link
          href="/admissions"
          className="hover:text-gray-200 transition duration-300 block"
        >
          Admission
        </Link>
        <Link
          href="/MyCollege"
          className="hover:text-gray-200 transition duration-300 block"
        >
          My College
        </Link>

        {user ? (
          <>
            <Link
              href="/profile"
              className="hover:text-gray-200 transition duration-300 block"
            >
              {user.displayName || user.email}
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="hover:text-gray-200 transition duration-300 block"
          >
            Login
          </Link>
        )}

        {!user && (
          <Link
            href="/register"
            className="hover:text-gray-200 transition duration-300 block"
          >
            Register
          </Link>
        )}
      </ul>
    </nav>
  );
}