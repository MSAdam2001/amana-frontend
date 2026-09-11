'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      // 1. Create the user account
      await registerUser(phone, password, role);

      // 2. Automatically log the user in
      const loginData = await loginUser(phone, password);

      // 3. Save JWT token
      localStorage.setItem('amana_token', loginData.accessToken);

      // 4. If the user is an artisan, create their artisan profile
      if (role === 'artisan') {
        const response = await fetch(
  ` ${process.env.NEXT_PUBLIC_API_URL}/profiles/artisan`,
  {
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
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.message || 'Failed to create artisan profile'
          );
        }

        // 5. Send artisan to the Profile section of the dashboard
        router.push('/dashboard?section=profile');
      } else {
        // Customer goes to homepage
        router.push('/');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong'
      );
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

        {/* Role selection */}
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

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone */}
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

          {/* Password */}
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

          {/* Artisan trade */}
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

          {/* Error */}
          {error && (
            <p className="font-body text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="font-body w-full bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-50 text-sand-50 px-6 py-3 rounded-sm transition-colors"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Login link */}
        <p className="font-body text-sm text-teal-800/70 mt-6 text-center">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-terracotta-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}