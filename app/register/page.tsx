
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
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(phone, email, password, role);

      if (role === 'artisan') {
        localStorage.setItem(
          'amana_pending_trade',
          tradeCategory || 'general'
        );
      }

      setRegistered(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  }

  if (registered) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-sand-50 flex items-center justify-center px-5 py-10">
        {/* Decorative background */}
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-terracotta-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-teal-900/10 blur-3xl animate-pulse" />

        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-900 text-sand-50 font-display text-xl shadow-lg">
                A
              </div>

              <span className="font-display text-2xl font-semibold text-teal-900">
                Amana
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-teal-900/10 bg-white/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_25px_80px_rgba(10,60,60,0.12)] text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-900/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-900 text-2xl text-white shadow-lg animate-[bounce_2s_ease-in-out_infinite]">
                ✓
              </div>
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-600">
              Almost there
            </p>

            <h1 className="font-display text-3xl sm:text-4xl text-teal-900">
              Check your email
            </h1>

            <p className="mt-4 text-sm leading-7 text-teal-800/65">
              We sent a verification link to
            </p>

            <p className="mt-1 break-all font-medium text-teal-900">
              {email}
            </p>

            <p className="mt-4 text-sm leading-6 text-teal-800/60">
              Click the link in your email to activate your Amana account.
              After verification, you can come back and log in.
            </p>

            <Link
              href="/login"
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-terracotta-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta-700 hover:shadow-xl"
            >
              Go to login
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <p className="mt-6 text-xs leading-5 text-teal-800/45">
              Didn&apos;t receive the email? Check your spam or junk folder.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-sand-50 px-5 py-8 sm:px-6">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-terracotta-500/10 blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-teal-900/10 blur-3xl" />

      <div className="absolute right-[8%] top-[15%] hidden rotate-12 select-none font-display text-[180px] font-bold leading-none text-teal-900/[0.025] lg:block">
        A
      </div>

      <div className="relative mx-auto w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-900 text-xl font-bold text-sand-50 shadow-lg transition-transform duration-300 hover:rotate-6">
              A
            </div>

            <span className="font-display text-3xl font-semibold text-teal-900">
              Amana
            </span>
          </Link>

          <p className="mt-3 text-sm text-teal-800/55">
            Trusted connections. Skilled hands.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-teal-900/10 bg-white/90 p-6 shadow-[0_25px_80px_rgba(10,60,60,0.12)] backdrop-blur-xl sm:p-9">
          <div className="mb-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-600">
              Get started
            </p>

            <h1 className="font-display text-3xl text-teal-900 sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-teal-800/55">
              Join Amana and connect with trusted people around you.
            </p>
          </div>

          {/* Role selection */}
          <div className="mb-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-800/60">
              I want to
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`group rounded-2xl border p-4 text-left transition-all duration-300 ${
                  role === 'customer'
                    ? 'border-terracotta-500 bg-terracotta-500/5 shadow-md'
                    : 'border-teal-900/10 bg-sand-50 hover:border-teal-900/25 hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-all ${
                    role === 'customer'
                      ? 'bg-terracotta-600 text-white'
                      : 'bg-teal-900/5 text-teal-900'
                  }`}
                >
                  ◎
                </div>

                <p className="text-sm font-semibold text-teal-900">
                  Find a service
                </p>

                <p className="mt-1 text-xs leading-5 text-teal-800/50">
                  I need a skilled professional
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRole('artisan')}
                className={`group rounded-2xl border p-4 text-left transition-all duration-300 ${
                  role === 'artisan'
                    ? 'border-terracotta-500 bg-terracotta-500/5 shadow-md'
                    : 'border-teal-900/10 bg-sand-50 hover:border-teal-900/25 hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-all ${
                    role === 'artisan'
                      ? 'bg-terracotta-600 text-white'
                      : 'bg-teal-900/5 text-teal-900'
                  }`}
                >
                  ✦
                </div>

                <p className="text-sm font-semibold text-teal-900">
                  Offer my skills
                </p>

                <p className="mt-1 text-xs leading-5 text-teal-800/50">
                  I&apos;m an artisan
                </p>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-teal-900">
                Phone number
              </label>

              <div className="group relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-800/35">
                  ☎
                </span>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="08012345678"
                  className="w-full rounded-xl border border-teal-900/15 bg-sand-50/60 px-11 py-3.5 text-sm text-teal-900 outline-none transition-all duration-300 placeholder:text-teal-900/25 focus:border-terracotta-500 focus:bg-white focus:ring-4 focus:ring-terracotta-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-teal-900">
                Email address
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-teal-800/35">
                  @
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-teal-900/15 bg-sand-50/60 px-11 py-3.5 text-sm text-teal-900 outline-none transition-all duration-300 placeholder:text-teal-900/25 focus:border-terracotta-500 focus:bg-white focus:ring-4 focus:ring-terracotta-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-teal-900">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-teal-900/15 bg-sand-50/60 px-4 py-3.5 pr-12 text-sm text-teal-900 outline-none transition-all duration-300 placeholder:text-teal-900/25 focus:border-terracotta-500 focus:bg-white focus:ring-4 focus:ring-terracotta-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-teal-800/45 transition hover:bg-teal-900/5 hover:text-teal-900"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Artisan trade */}
            {role === 'artisan' && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <label className="mb-2 block text-sm font-medium text-teal-900">
                  Your trade
                </label>

                <input
                  type="text"
                  value={tradeCategory}
                  onChange={(e) => setTradeCategory(e.target.value)}
                  required
                  placeholder="e.g. electrician, tailor, plumber"
                  className="w-full rounded-xl border border-teal-900/15 bg-sand-50/60 px-4 py-3.5 text-sm text-teal-900 outline-none transition-all duration-300 placeholder:text-teal-900/25 focus:border-terracotta-500 focus:bg-white focus:ring-4 focus:ring-terracotta-500/10"
                />

                <p className="mt-2 text-xs text-teal-800/45">
                  You can complete your professional profile after verification.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-[fadeIn_0.25s_ease-out]">
                <span className="mt-0.5">!</span>
                <p>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-terracotta-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-terracotta-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="my-7 h-px bg-teal-900/10" />

          <p className="text-center text-sm text-teal-800/55">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-terracotta-600 transition hover:text-terracotta-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-teal-900/35">
          By creating an account, you agree to use Amana responsibly and
          respectfully.
        </p>
      </div>
    </main>
  );
}

