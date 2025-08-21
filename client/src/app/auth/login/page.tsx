"use client"


import Link from 'next/link';
import React, { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setPage('home');
  };

  // Esta função agora apenas registra uma mensagem para indicar que a funcionalidade será implementada.
  const handleGoToSignup = () => {
    console.log('Sign up button clicked. Functionality to be implemented.');
  };

  const renderPage = () => {
    switch (page) {
      case 'login':
        return (
          <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4 font-sans">
            <div className="w-full max-w-sm rounded-2xl bg-neutral-800 p-8 shadow-2xl">
              <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm ring-offset-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm ring-offset-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="********"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-sky-500 text-sm font-medium text-white ring-offset-neutral-900 transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full"
                >
                  Log In
                </button>
              </form>
              <div className="mt-4 text-center text-sm">
                <Link
                  href="/auth/register"
                  className="text-sky-500 hover:underline"
                  onClick={handleGoToSignup}
                >
                  Don't have an account? Sign up!
                </Link>
              </div>
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4 font-sans">
            <div className="w-full max-w-lg rounded-2xl bg-neutral-800 p-8 shadow-2xl text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
              <p className="text-lg">You are logged in and ready to tweet!</p>
              <p className="text-sm mt-2">Simulating the Twitter home screen.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderPage();
}


