'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getArtisanProfile, ArtisanProfileDetail } from '@/lib/api/profiles';
import { createBooking } from '@/lib/api/bookings';

export default function ArtisanProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<ArtisanProfileDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [description, setDescription] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSent, setBookingSent] = useState(false);

  useEffect(() => {
    getArtisanProfile(id)
      .then((data) => setProfile(data))
      .catch(() => setError('This artisan profile could not be found.'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');

    try {
      await createBooking({ artisanProfileId: id, description });
      setBookingSent(true);
      setShowBookingForm(false);
    } catch (err: any) {
      setBookingError(err.message || 'Failed to send booking request.');
    } finally {
      setBookingLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-teal-800">Loading...</p>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-red-600">{error || 'Profile not found.'}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand-50 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2 capitalize">
          {profile.tradeCategory}
        </p>
        <h1 className="font-display text-4xl text-teal-900 mb-2 capitalize">
          {profile.tradeCategory}
        </h1>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {profile.ratingCount > 0 ? (
            <p className="font-body text-teal-800">
              ★ {profile.ratingAvg.toFixed(1)} ({profile.ratingCount} review{profile.ratingCount !== 1 ? 's' : ''})
            </p>
          ) : (
            <p className="font-body text-teal-800/60">No reviews yet</p>
          )}
          <span className="text-teal-800/30">•</span>
          <p className="font-body text-sm capitalize text-teal-800/70">
            {profile.verificationStatus}
          </p>
          <span className="text-teal-800/30">•</span>
          <span
            className={`font-body text-sm px-2 py-0.5 rounded-sm ${
              profile.isAvailable
                ? 'bg-teal-800/10 text-teal-800'
                : 'bg-sand-100 text-teal-800/60'
            }`}
          >
            {profile.isAvailable ? 'Available now' : 'Not available'}
          </span>
        </div>

        {profile.bio && (
          <div className="bg-white border border-teal-800/10 rounded-sm p-6 mb-6">
            <h2 className="font-display text-xl text-teal-900 mb-2">About</h2>
            <p className="font-body text-teal-800">{profile.bio}</p>
          </div>
        )}

        <div className="bg-white border border-teal-800/10 rounded-sm p-6 mb-6">
          <h2 className="font-display text-xl text-teal-900 mb-3">Experience</h2>
          <p className="font-body text-teal-800">
            {profile.yearsExperience} year{profile.yearsExperience !== 1 ? 's' : ''} of experience
          </p>

          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-body text-sm bg-sand-100 text-teal-900 px-3 py-1 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {profile.portfolioPhotos.length > 0 && (
          <div className="bg-white border border-teal-800/10 rounded-sm p-6 mb-6">
            <h2 className="font-display text-xl text-teal-900 mb-3">Past work</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {profile.portfolioPhotos.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`Work sample ${i + 1}`}
                  className="w-full aspect-square object-cover rounded-sm"
                />
              ))}
            </div>
          </div>
        )}

        {bookingSent ? (
          <p className="font-body text-teal-800 font-medium bg-white border border-teal-800/10 rounded-sm p-6">
            Booking request sent — {profile.tradeCategory} will be notified.
          </p>
        ) : showBookingForm ? (
          <form onSubmit={handleBookingSubmit} className="bg-white border border-teal-800/10 rounded-sm p-6">
            <h2 className="font-display text-xl text-teal-900 mb-3">Request a booking</h2>
            <textarea
              required
              placeholder="Briefly describe the job"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-body w-full p-2 border border-teal-800/20 rounded-sm text-sm mb-3"
              rows={3}
            />
            {bookingError && (
              <p className="font-body text-red-600 text-sm mb-3">{bookingError}</p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={bookingLoading}
                className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm"
              >
                {bookingLoading ? 'Sending...' : 'Confirm request'}
              </button>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="font-body border border-teal-800/30 text-teal-900 px-4 py-2 rounded-sm text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowBookingForm(true)}
            className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-6 py-3 rounded-sm transition-colors"
          >
            Request booking
          </button>
        )}
      </div>
    </main>
  );
}