'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { searchArtisans, ArtisanSearchResult } from '@/lib/api/search';
import { createBooking } from '@/lib/api/bookings';

const CATEGORY_ICONS: Record<string, string> = {
  plumber: '🔧',
  electrician: '⚡',
  carpenter: '🪚',
  tailor: '🧵',
  mechanic: '🚗',
  'solar technician': '☀️',
};

const SERVICE_OPTIONS = ['plumber', 'electrician', 'carpenter', 'tailor', 'mechanic', 'solar technician'];
const DISTANCE_OPTIONS = [2, 5, 10, 25, 50];
const RATING_OPTIONS = [4, 4.5];

function SearchPageContent() {
  const params = useSearchParams();

  const [category, setCategory] = useState(params.get('category') || '');
  const [radiusKm, setRadiusKm] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<'recommended' | 'distance' | 'rating'>('recommended');
  const [latitude, setLatitude] = useState('12.0');
  const [longitude, setLongitude] = useState('8.5167');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [results, setResults] = useState<ArtisanSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const [bookingArtisanId, setBookingArtisanId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  async function runSearch(cat: string, radius: number) {
    setLoading(true);
    setError('');

    try {
      const data = await searchArtisans({
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        category: cat || undefined,
        radiusKm: radius,
      });
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError('Something went wrong searching for artisans. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const urlCategory = params.get('category');
    runSearch(urlCategory || '', radiusKm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFilterSearch() {
    runSearch(category, radiusKm);
  }

  function openBookingForm(artisanId: string) {
    setBookingArtisanId(artisanId);
    setDescription('');
    setBookingError('');
  }

  async function handleBookingSubmit(e: React.FormEvent, artisanProfileId: string) {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');

    try {
      await createBooking({ artisanProfileId, description });
      setBookedIds((prev) => [...prev, artisanProfileId]);
      setBookingArtisanId(null);
    } catch (err: any) {
      setBookingError(err.message || 'Failed to send booking request.');
    } finally {
      setBookingLoading(false);
    }
  }

  function clearFilters() {
    setCategory('');
    setRadiusKm(50);
    setMinRating(0);
    runSearch('', 50);
  }

  const filteredResults = results
    .filter((a) => !minRating || (a.ratingAvg && a.ratingAvg >= minRating))
    .sort((a, b) => {
      if (sort === 'distance') return a.distanceMeters - b.distanceMeters;
      if (sort === 'rating') return (b.ratingAvg || 0) - (a.ratingAvg || 0);
      return 0;
    });

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-teal-800/10 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-terracotta-50 border border-terracotta-600/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600" />
            <p className="font-body text-xs font-semibold tracking-wider uppercase text-terracotta-600">
              Find an artisan
            </p>
          </div>
          <h1 className="font-display text-4xl text-teal-900 mb-2">
            Find the right artisan for your job
          </h1>
          <p className="font-body text-teal-800/70">
            Discover skilled, verified artisans near you in Kano.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* FILTERS SIDEBAR */}
        <aside className="bg-white border border-teal-800/10 rounded-sm p-6 h-fit shadow-sm">
          <p className="font-display text-lg text-teal-900 mb-5">Filters</p>

          <div className="mb-6">
            <p className="font-body text-sm font-semibold text-teal-900 mb-3">Service</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  checked={category === ''}
                  onChange={() => setCategory('')}
                  className="accent-terracotta-600"
                />
                <span className="font-body text-sm text-teal-800 group-hover:text-terracotta-600 transition-colors">
                  All services
                </span>
              </label>
              {SERVICE_OPTIONS.map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    checked={category === s}
                    onChange={() => setCategory(s)}
                    className="accent-terracotta-600"
                  />
                  <span className="font-body text-sm text-teal-800 capitalize group-hover:text-terracotta-600 transition-colors">
                    {CATEGORY_ICONS[s]} {s}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 pt-6 border-t border-teal-800/10">
            <p className="font-body text-sm font-semibold text-teal-900 mb-3">Distance</p>
            <div className="flex flex-col gap-2">
              {DISTANCE_OPTIONS.map((d) => (
                <label key={d} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    checked={radiusKm === d}
                    onChange={() => setRadiusKm(d)}
                    className="accent-terracotta-600"
                  />
                  <span className="font-body text-sm text-teal-800 group-hover:text-terracotta-600 transition-colors">
                    Under {d} km
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 pt-6 border-t border-teal-800/10">
            <p className="font-body text-sm font-semibold text-teal-900 mb-3">Rating</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                  className="accent-terracotta-600"
                />
                <span className="font-body text-sm text-teal-800 group-hover:text-terracotta-600 transition-colors">
                  Any rating
                </span>
              </label>
              {RATING_OPTIONS.map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                    className="accent-terracotta-600"
                  />
                  <span className="font-body text-sm text-teal-800 group-hover:text-terracotta-600 transition-colors">
                    ★ {r}+
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleFilterSearch}
            className="font-body w-full bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 font-semibold py-2.5 rounded-sm transition-colors mb-2"
          >
            Apply filters
          </button>
          <button
            onClick={clearFilters}
            className="font-body w-full text-sm text-teal-800/60 hover:text-terracotta-600 transition-colors"
          >
            Clear filters
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="font-body w-full text-xs text-teal-800/40 hover:text-teal-800 transition-colors mt-6 pt-4 border-t border-teal-800/10"
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced (coordinates)
          </button>
          {showAdvanced && (
            <div className="mt-3 flex flex-col gap-2">
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                className="font-body text-sm border border-teal-800/15 rounded-sm px-3 py-1.5"
              />
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
                className="font-body text-sm border border-teal-800/15 rounded-sm px-3 py-1.5"
              />
            </div>
          )}
        </aside>

        {/* RESULTS */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="font-body text-teal-800">
              {loading ? (
                'Searching...'
              ) : (
                <>
                  <span className="font-display text-xl text-teal-900">{filteredResults.length}</span>{' '}
                  artisan{filteredResults.length !== 1 ? 's' : ''} found
                </>
              )}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="font-body text-sm border border-teal-800/15 rounded-sm px-3 py-2 bg-white text-teal-900 focus:outline-none focus:border-terracotta-600"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="distance">Sort: Nearest</option>
              <option value="rating">Sort: Highest rated</option>
            </select>
          </div>

          {error && (
            <p className="font-body text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3 mb-6">
              {error}
            </p>
          )}

          {searched && !loading && filteredResults.length === 0 && !error && (
            <p className="font-body text-teal-800 bg-white border border-teal-800/10 rounded-sm px-4 py-6 text-center">
              No artisans found. Try a wider distance or different filters.
            </p>
          )}

          <div className="flex flex-col gap-4 mb-8">
            {filteredResults.map((artisan, i) => (
              <div
                key={artisan._id}
                className="bg-white border border-teal-800/10 rounded-sm p-6 shadow-sm hover:shadow-lg hover:border-terracotta-400 transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <Link href={`/artisan/${artisan._id}`} className="group flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-sm bg-terracotta-50 flex items-center justify-center text-2xl shrink-0">
                      {CATEGORY_ICONS[artisan.tradeCategory] || '🛠️'}
                    </div>
                    <div>
                      <p className="font-display text-xl text-teal-900 capitalize group-hover:text-terracotta-600 transition-colors">
                        {artisan.tradeCategory}
                      </p>
                      <p className="font-body text-sm text-terracotta-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        View profile →
                      </p>
                    </div>
                  </Link>
                  {artisan.verificationStatus === 'verified' && (
                    <span className="font-body text-xs font-semibold bg-teal-900 text-sand-50 px-2.5 py-1 rounded-full shrink-0">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-4 pl-[60px]">
                  {artisan.ratingAvg ? (
                    <span className="inline-flex items-center gap-1 bg-gold-400/10 text-gold-500 font-body text-sm font-semibold px-2.5 py-1 rounded-full">
                      ★ {artisan.ratingAvg.toFixed(1)}
                      <span className="text-teal-800/50 font-normal">({artisan.ratingCount})</span>
                    </span>
                  ) : (
                    <span className="font-body text-sm text-teal-800/50 italic">No reviews yet</span>
                  )}
                  <span className="font-body text-sm text-teal-800/50">
                    {(artisan.distanceMeters / 1000).toFixed(1)} km away
                  </span>
                </div>

                {bookedIds.includes(artisan._id) ? (
                  <p className="font-body text-teal-800 font-semibold bg-teal-800/5 rounded-sm px-4 py-2.5 inline-block">
                    Booking request sent
                  </p>
                ) : bookingArtisanId === artisan._id ? (
                  <form onSubmit={(e) => handleBookingSubmit(e, artisan._id)} className="mt-3">
                    <textarea
                      required
                      placeholder="Briefly describe the job"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="font-body w-full border border-teal-800/15 rounded-sm px-4 py-2.5 mb-3 focus:outline-none focus:border-terracotta-600 transition-colors"
                      rows={3}
                    />
                    {bookingError && <p className="font-body text-red-600 text-sm mb-3">{bookingError}</p>}
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 font-semibold px-5 py-2.5 rounded-sm transition-colors"
                      >
                        {bookingLoading ? 'Sending...' : 'Confirm request'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingArtisanId(null)}
                        className="font-body border border-teal-800/20 text-teal-900 px-5 py-2.5 rounded-sm hover:border-teal-900 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => openBookingForm(artisan._id)}
                    className="font-body border-2 border-terracotta-600 text-terracotta-600 hover:bg-terracotta-600 hover:text-sand-50 font-semibold px-5 py-2.5 rounded-sm transition-colors"
                  >
                    Request booking
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Map placeholder, honest */}
          <div className="bg-white border border-teal-800/10 rounded-sm p-10 text-center shadow-sm">
            <p className="font-display text-lg text-teal-900 mb-2">Map view</p>
            <p className="font-body text-sm text-teal-800/60">Coming soon</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand-50" />}>
      <SearchPageContent />
    </Suspense>
  );
}