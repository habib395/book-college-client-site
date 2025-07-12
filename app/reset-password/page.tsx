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
      alert("Password reset email sent");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset email");
    }
  };

  return (
    <form onSubmit={handleReset} className="p-6 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded w-full">
        Send Reset Email
      </button>
    </form>
  );
}