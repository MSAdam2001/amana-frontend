'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '@/lib/api/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'customer' | 'artisan'>('customer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [tradeCategory, setTradeCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(phone, password, role);

      const loginData = await loginUser(phone, password);
      localStorage.setItem('amana_token', loginData.accessToken);

      if (role === 'artisan') {
        await fetch('http://localhost:3000/profiles/artisan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginData.accessToken}`,
          },
          body: JSON.stringify({
            tradeCategory: tradeCategory || 'general',
            longitude: 8.5167,
            latitude: 12.0,
          }),
        });
        router.push('/edit-profile');
      } else {
        router.push('/dashboard');
      }
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
          Create your account
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`font-body flex-1 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors ${
              role === 'customer'
                ? 'bg-terracotta-600 text-sand-50'
                : 'border border-teal-800/30 text-teal-900'
            }`}
          >
            I need a service
          </button>
          <button
            type="button"
            onClick={() => setRole('artisan')}
            className={`font-body flex-1 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors ${
              role === 'artisan'
                ? 'bg-terracotta-600 text-sand-50'
                : 'border border-teal-800/30 text-teal-900'
            }`}
          >
            I&apos;m an artisan
          </button>
        </div>

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
              minLength={6}
              className="font-body w-full border border-teal-800/30 rounded-sm px-4 py-2.5 bg-white text-teal-900 focus:outline-none focus:border-terracotta-600"
              placeholder="At least 6 characters"
            />
          </div>

          {role === 'artisan' && (
            <div>
              <label className="font-body text-sm text-teal-800 block mb-1">
                Your trade
              </label>
              <input
                type="text"
                value={tradeCategory}
                onChange={(e) => setTradeCategory(e.target.value)}
                required
                className="font-body w-full border border-teal-800/30 rounded-sm px-4 py-2.5 bg-white text-teal-900 focus:outline-none focus:border-terracotta-600"
                placeholder="e.g. electrician, tailor, plumber"
              />
            </div>
          )}

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
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="font-body text-sm text-teal-800/70 mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-terracotta-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}