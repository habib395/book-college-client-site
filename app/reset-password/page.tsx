"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email.trim());
      alert("✅ Password reset email sent!");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleReset}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-600">Reset Your Password</h2>
        <p className="text-center text-gray-600 text-sm">
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
}