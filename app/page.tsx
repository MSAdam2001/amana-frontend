'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { searchArtisans, ArtisanSearchResult } from '@/lib/api/search';

export default function Home() {
  const [artisans, setArtisans] = useState<ArtisanSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchArtisans({ latitude: 12.0, longitude: 8.5167, radiusKm: 50 })
      .then((data) => setArtisans(data))
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-sand-50">
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-4">
          Kano · Northern Nigeria
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-teal-900 leading-tight mb-6">
          Hire verified artisans<br />you can trust.
        </h1>
        <p className="font-body text-lg text-teal-800/80 max-w-xl mb-10">
          Amana connects you with skilled, verified local artisans — electricians,
          tailors, mechanics — built on real completed jobs, not empty claims.
        </p>
        <div className="flex gap-4">
          <Link
            href="/search"
            className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-6 py-3 rounded-sm transition-colors"
          >
            Find an Artisan
          </Link>
         <Link
  href="/register"
  className="font-body border border-teal-800/30 hover:border-teal-800 text-teal-900 px-6 py-3 rounded-sm transition-colors"
>
  I&apos;m an Artisan
</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="font-display text-2xl text-teal-900 mb-6">
          Artisans near Kano
        </h2>

        {loading ? (
          <p className="font-body text-teal-800">Loading...</p>
        ) : artisans.length === 0 ? (
          <p className="font-body text-teal-800">
            No artisans to show yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {artisans.map((artisan) => (
              <Link
                key={artisan._id}
                href={`/artisan/${artisan._id}`}
                className="block bg-white border border-teal-800/10 rounded-sm p-5 hover:border-terracotta-600 transition-colors"
              >
                <p className="font-body font-medium text-teal-900 capitalize mb-1">
                  {artisan.tradeCategory}
                </p>
                <p className="font-body text-sm text-teal-800/70">
                  {artisan.ratingAvg
                    ? `★ ${artisan.ratingAvg.toFixed(1)} (${artisan.ratingCount} review${artisan.ratingCount !== 1 ? 's' : ''})`
                    : 'No reviews yet'}
                </p>
                <p className="font-body text-sm capitalize text-teal-800/50 mt-1">
                  {artisan.verificationStatus}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}