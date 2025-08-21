"use client"

import Link from "next/link";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!"); // 🔴 dispara Alert do shadcn
      return;
    }
    setError(null);
    console.log("✅ Sign up form data:", formData);
  };

  const handleGoToLogin = () => {
    console.log("Log In button clicked. Navigation to be implemented.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4 font-sans">
      <div className="w-full max-w-sm rounded-2xl bg-neutral-800 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              placeholder="yourusername"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              placeholder="********"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              placeholder="confirm password"
            />
          </div>
          {error && (
            <Alert
              variant="destructive"
              className="mt-2 flex items-start gap-2 rounded-lg border border-red-600 bg-red-950/60 text-red-400"
            >
              <TriangleAlert className="h-4 w-4 mt-0.5 text-red-500" />
              <div>
                <AlertTitle className="text-red-400">Error</AlertTitle>
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </div>
            </Alert>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 text-sm font-medium text-white transition-colors hover:bg-sky-600 h-10 px-4 py-2 w-full"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link
            href="/auth/login"
            className="text-sky-500 hover:underline"
            onClick={handleGoToLogin}
          >
            Already have an account? Log In!
          </Link>
        </div>
      </div>
    </div>
  );
}
