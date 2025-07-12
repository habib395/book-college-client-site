"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <Link href="/reset-password" className="text-blue-600 block mt-2 text-center">
            Forget password?
      </Link>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      <button
        type="button"
        onClick={loginWithGoogle}
        className="bg-red-500 text-white px-4 py-2 mt-2 rounded w-full"
      >
        Login with Google
      </button>
    </form>
  );
}

