'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(phone, password);
      localStorage.setItem('amana_token', data.accessToken);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-sand-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
          Amana
        </p>
        <h1 className="font-display text-3xl text-teal-900 mb-8">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-sm text-teal-800 block mb-1">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="font-body w-full border border-teal-800/30 rounded-sm px-4 py-2.5 bg-white text-teal-900 focus:outline-none focus:border-terracotta-600"
              placeholder="08012345678"
            />
          </div>

          <div>
            <label className="font-body text-sm text-teal-800 block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="font-body w-full border border-teal-800/30 rounded-sm px-4 py-2.5 bg-white text-teal-900 focus:outline-none focus:border-terracotta-600"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-body w-full bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-50 text-sand-50 px-6 py-3 rounded-sm transition-colors"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </main>
  );
}