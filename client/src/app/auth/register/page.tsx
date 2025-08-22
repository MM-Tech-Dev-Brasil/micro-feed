'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import { signupSchema } from '@/schemas/register';
import { useRouter } from 'next/navigation';
import { register } from '@/api/auth';

export default function App() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]);
    setLoading(true);

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      setLoading(false);
      const fieldErrors = result.error.flatten().fieldErrors;
      const allErrorMessages = Object.values(fieldErrors)
        .flat()
        .filter(Boolean);
      setErrorMessages(allErrorMessages as string[]);
      return;
    }

    const registered = await register(formData.username, formData.password);
    setLoading(false);

    if (!registered) setErrorMessages(['Something went wrong']);
    if (registered) router.push('/auth/login');
  };

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-neutral-900 text-white p-4 font-sans'>
      <div className='w-full max-w-sm rounded-2xl bg-neutral-800 p-8 shadow-2xl'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Sign Up</h1>
        <form onSubmit={handleSignup} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='username' className='text-sm font-medium'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
              className='flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              placeholder='Your username'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='password' className='text-sm font-medium'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              placeholder='********'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='confirmPassword' className='text-sm font-medium'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              placeholder='Confirm password'
            />
          </div>

          {errorMessages.length > 0 && (
            <Alert
              variant='destructive'
              className='mt-2 flex flex-col gap-2 rounded-lg border border-red-600 bg-red-950/60 text-red-400'
            >
              <div className='flex items-center gap-2'>
                <TriangleAlert className='h-4 w-4 mt-0.5 text-red-500' />
                <AlertTitle className='text-red-400'>Error</AlertTitle>
              </div>
              <AlertDescription className='text-red-300'>
                <ul className='list-disc list-inside'>
                  {errorMessages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <button
            type='submit'
            disabled={loading}
            className='cursor-pointer inline-flex items-center justify-center rounded-lg bg-sky-500 text-sm font-medium text-white transition-colors hover:bg-sky-600 h-10 px-4 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className='mt-4 text-center text-sm'>
          <Link
            href='/auth/login'
            className='text-sky-500 hover:underline'
            onClick={handleGoToLogin}
          >
            Already have an account? Log In!
          </Link>
        </div>
      </div>
    </div>
  );
}
