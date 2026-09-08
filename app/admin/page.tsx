'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPendingArtisans, getAllArtisans, setArtisanVerification, PendingArtisan } from '@/lib/api/admin';

export default function AdminPage() {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [view, setView] = useState<'pending' | 'all'>('pending');
  const [artisans, setArtisans] = useState<PendingArtisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actingOnId, setActingOnId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('amana_token');
    if (!token) {
      router.push('/login');
      return;
    }

   fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
  headers: { Authorization: `Bearer ${token}` },
})
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.role !== 'admin') {
          router.push('/');
          return;
        }
        setAllowed(true);
      })
      .finally(() => setCheckingAccess(false));
  }, [router]);

  useEffect(() => {
    if (!allowed) return;

    setLoading(true);
    setError('');

    const fetchFn = view === 'pending' ? getPendingArtisans : getAllArtisans;

    fetchFn()
      .then((data) => setArtisans(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [allowed, view]);

  async function handleDecision(id: string, status: 'verified' | 'unverified') {
    setActingOnId(id);
    try {
      await setArtisanVerification(id, status);
      if (view === 'pending') {
        setArtisans((prev) => prev.filter((a) => a._id !== id));
      } else {
        setArtisans((prev) =>
          prev.map((a) => (a._id === id ? { ...a, verificationStatus: status } : a))
        );
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update this artisan.');
    } finally {
      setActingOnId(null);
    }
  }

  if (checkingAccess) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-teal-800">Loading...</p>
      </main>
    );
  }

  if (!allowed) {
    return null;
  }

  return (
    <main className="min-h-screen bg-sand-50 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
          Admin
        </p>
        <h1 className="font-display text-4xl text-teal-900 mb-2">
          Artisans
        </h1>
        {!loading && (
          <p className="font-body text-teal-800/60 text-sm mb-6">
            {artisans.length} {view === 'pending' ? 'awaiting review' : 'total on the platform'}
          </p>
        )}

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('pending')}
            className={`font-body px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              view === 'pending'
                ? 'bg-terracotta-600 text-sand-50'
                : 'border border-teal-800/30 text-teal-900'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setView('all')}
            className={`font-body px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              view === 'all'
                ? 'bg-terracotta-600 text-sand-50'
                : 'border border-teal-800/30 text-teal-900'
            }`}
          >
            All artisans
          </button>
        </div>

        {error && <p className="font-body text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p className="font-body text-teal-800">Loading...</p>
        ) : artisans.length === 0 ? (
          <p className="font-body text-teal-800">
            {view === 'pending' ? 'No artisans awaiting review.' : 'No artisans on the platform yet.'}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {artisans.map((artisan) => (
              <div
                key={artisan._id}
                className="bg-white border border-teal-800/10 rounded-sm p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-body font-medium text-teal-900 capitalize">
                    {artisan.tradeCategory}
                  </p>
                  <span
                    className={`font-body text-xs px-2 py-0.5 rounded-sm capitalize ${
                      artisan.verificationStatus === 'verified'
                        ? 'bg-teal-800/10 text-teal-800'
                        : 'bg-sand-100 text-teal-800/60'
                    }`}
                  >
                    {artisan.verificationStatus}
                  </span>
                </div>
                {artisan.bio && (
                  <p className="font-body text-teal-800 text-sm mt-1">{artisan.bio}</p>
                )}
                <p className="font-body text-sm text-teal-800/60 mt-1">
                  {artisan.yearsExperience} years experience
                  {artisan.skills.length > 0 && ` · ${artisan.skills.join(', ')}`}
                </p>

                {view === 'pending' ? (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleDecision(artisan._id, 'verified')}
                      disabled={actingOnId === artisan._id}
                      className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm"
                    >
                      {actingOnId === artisan._id ? 'Updating...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleDecision(artisan._id, 'unverified')}
                      disabled={actingOnId === artisan._id}
                      className="font-body border border-teal-800/30 text-teal-900 px-4 py-2 rounded-sm text-sm"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  artisan.verificationStatus === 'verified' ? (
                    <button
                      onClick={() => handleDecision(artisan._id, 'unverified')}
                      disabled={actingOnId === artisan._id}
                      className="font-body border border-teal-800/30 text-teal-900 px-4 py-2 rounded-sm text-sm mt-3"
                    >
                      {actingOnId === artisan._id ? 'Updating...' : 'Revoke verification'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDecision(artisan._id, 'verified')}
                      disabled={actingOnId === artisan._id}
                      className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm mt-3"
                    >
                      {actingOnId === artisan._id ? 'Updating...' : 'Approve'}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}