"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 text-black font-bold text-xl">
            <Link href="/" className="text-emerald-700">EduPortal</Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center text-black font-medium">
            <Link href="/Home" className="hover:text-emerald-700 transition">Home</Link>
            <Link href="/colleges" className="hover:text-emerald-700 transition">College</Link>
            <Link href="/admissions" className="hover:text-emerald-700 transition">Admission</Link>
            <Link href="/MyCollege" className="hover:text-emerald-700 transition">My College</Link>

            {user ? (
              <>
                <Link href="/profile" className="hover:text-emerald-700 transition">
                  {user.displayName || user.email}
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-emerald-700 transition">Login</Link>
                <Link href="/register" className="hover:text-emerald-700 transition">Register</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-emerald-100 p-4 rounded">
            <Link href="/Home" onClick={toggleMenu} className="block text-black hover:text-emerald-700">Home</Link>
            <Link href="/colleges" onClick={toggleMenu} className="block text-black hover:text-emerald-700">College</Link>
            <Link href="/admissions" onClick={toggleMenu} className="block text-black hover:text-emerald-700">Admission</Link>
            <Link href="/MyCollege" onClick={toggleMenu} className="block text-black hover:text-emerald-700">My College</Link>

            {user ? (
              <>
                <Link href="/profile" onClick={toggleMenu} className="block text-black hover:text-emerald-700">
                  {user.displayName || "Profile" }
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={toggleMenu} className="block text-black hover:text-emerald-700">Login</Link>
                <Link href="/register" onClick={toggleMenu} className="block text-black hover:text-emerald-700">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}