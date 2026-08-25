'use client';

import { useState } from 'react';
import { searchArtisans, ArtisanSearchResult } from '@/lib/api/search';
import { createBooking } from '@/lib/api/bookings';

export default function SearchPage() {
  const [category, setCategory] = useState('');
  const [radiusKm, setRadiusKm] = useState(10);
  const [latitude, setLatitude] = useState('12.0');
  const [longitude, setLongitude] = useState('8.5167');
  const [results, setResults] = useState<ArtisanSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const [bookingArtisanId, setBookingArtisanId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await searchArtisans({
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        category: category || undefined,
        radiusKm,
      });
      setResults(data);
      setSearched(true);
    } catch (err) {
      setError('Something went wrong searching for artisans. Please try again.');
    } finally {
      setLoading(false);
    }
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

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ color: 'var(--color-terracotta-600)', fontWeight: 600, marginBottom: '0.25rem' }}>
        FIND AN ARTISAN
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem' }}>
        Search verified artisans near you
      </h1>

      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label htmlFor="category">Trade category</label>
          <input
            id="category"
            type="text"
            placeholder="e.g. electrician"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="radius">Search radius: {radiusKm} km</label>
          <input
            id="radius"
            type="range"
            min="1"
            max="50"
            value={radiusKm}
            onChange={(e) => setRadiusKm(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--color-terracotta-600)',
            color: 'white',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: '2px',
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searched && !loading && results.length === 0 && !error && (
        <p>No artisans found in that area. Try a wider radius or a different category.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {results.map((artisan) => (
          <div
            key={artisan._id}
            style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}
          >
            <p style={{ fontWeight: 600, textTransform: 'capitalize' }}>{artisan.tradeCategory}</p>
            <p>
              {artisan.ratingAvg ? `★ ${artisan.ratingAvg.toFixed(1)} (${artisan.ratingCount} reviews)` : 'No reviews yet'}
            </p>
            <p>{(artisan.distanceMeters / 1000).toFixed(1)} km away</p>
            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.75rem' }}>{artisan.verificationStatus}</p>

            {bookedIds.includes(artisan._id) ? (
              <p style={{ color: 'var(--color-teal-800)', fontWeight: 600 }}>Booking request sent</p>
            ) : bookingArtisanId === artisan._id ? (
              <form onSubmit={(e) => handleBookingSubmit(e, artisan._id)} style={{ marginTop: '0.5rem' }}>
                <textarea
                  required
                  placeholder="Briefly describe the job (e.g. rewire kitchen socket)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', minHeight: '60px', marginBottom: '0.5rem' }}
                />
                {bookingError && <p style={{ color: 'red', fontSize: '0.85rem' }}>{bookingError}</p>}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--color-terracotta-600)',
                      color: 'white',
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRadius: '2px',
                    }}
                  >
                    {bookingLoading ? 'Sending...' : 'Confirm request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingArtisanId(null)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'none',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => openBookingForm(artisan._id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: 'var(--color-terracotta-600)',
                  border: '1px solid var(--color-terracotta-600)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
              >
                Request booking
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}