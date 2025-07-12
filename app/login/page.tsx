"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-700">Welcome Back</h2>
        <p className="text-center text-gray-600">Login to your account</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="text-right">
          <Link href="/reset-password" className="text-emerald-600 hover:underline text-sm">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          Login
        </button>

        <div className="relative text-center">
          <span className="text-gray-400 px-3 bg-white z-10 relative">or</span>
          <hr className="absolute inset-0 top-3 border-t border-gray-300 z-0" />
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-emerald-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}