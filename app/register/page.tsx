'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/lib/api/auth';

export default function RegisterPage() {
  const [role, setRole] = useState<'customer' | 'artisan'>('customer');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tradeCategory, setTradeCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(phone, email, password, role);

      // Save the intended trade so we can create the artisan
      // profile right after the user verifies and logs in.
      if (role === 'artisan') {
        localStorage.setItem('amana_pending_trade', tradeCategory || 'general');
      }

      setRegistered(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (registered) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
            Amana
          </p>

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-900/5 text-3xl">
            📧
          </div>

          <h1 className="font-display text-3xl text-teal-900 mb-3">
            Check your email
          </h1>

          <p className="font-body text-sm text-teal-800/70 leading-6 mb-8">
            We sent a verification link to <strong>{email}</strong>. Click
            the link to activate your account, then come back and log in.
          </p>

          <Link
            href="/login"
            className="font-body inline-flex w-full items-center justify-center bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-6 py-3 rounded-sm transition-colors"
          >
            Go to login
          </Link>

          <p className="font-body text-sm text-teal-800/50 mt-6">
            Didn&apos;t get the email? Check your spam folder.
          </p>
        </div>
      </main>
    );
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

          {/* Email */}
          <div>
            <label className="font-body text-sm text-teal-800 block mb-1">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-body w-full border border-teal-800/30 rounded-sm px-4 py-2.5 bg-white text-teal-900 focus:outline-none focus:border-terracotta-600"
              placeholder="you@example.com"
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