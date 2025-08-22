"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { useAuth } from "@/hooks/useAuth";

export default function App() {
  const router = useRouter();
  const { loginUser, loading, error } = useAuth(); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    const success = await loginUser(formData.username, formData.password);
    if (success) router.push("/feed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4 font-sans">
      <Card className="w-full max-w-sm bg-neutral-800 text-white shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className="bg-neutral-900 border-neutral-700 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="bg-neutral-900 border-neutral-700 text-white"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link
              href="/auth/register"
              className="text-sky-500 hover:underline"
            >
              Don&apos;t have an account? Sign up!
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
