'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMyBookings, updateBookingStatus, MyBooking } from '@/lib/api/bookings';
import { createReview } from '@/lib/api/reviews';
import { getMyArtisanProfile, updateMyArtisanProfile, ArtisanProfileDetail } from '@/lib/api/profiles';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ userId: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  const [myProfile, setMyProfile] = useState<ArtisanProfileDetail | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('amana_token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetch('http://localhost:3000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Session expired');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('amana_token');
        router.push('/login');
      });
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const role = user.role === 'artisan' ? 'artisan' : 'customer';

    getMyBookings(role)
      .then((data) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setBookingsLoading(false));
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== 'artisan') return;

    getMyArtisanProfile()
      .then((profile) => setMyProfile(profile))
      .catch(() => {});
  }, [user]);

  async function handleAvailabilityToggle() {
    if (!myProfile) return;
    const newValue = !myProfile.isAvailable;
    setAvailabilityLoading(true);
    setAvailabilityError('');

    try {
      const updated = await updateMyArtisanProfile({ isAvailable: newValue });
      setMyProfile(updated);
    } catch (err: any) {
      setAvailabilityError(err.message || 'Failed to update availability');
    } finally {
      setAvailabilityLoading(false);
    }
  }

  async function handleStatusChange(bookingId: string, newStatus: string) {
    setActionError('');
    setUpdatingId(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err: any) {
      setActionError(err.message || 'Failed to update booking');
    } finally {
      setUpdatingId(null);
    }
  }

  function openReviewForm(bookingId: string) {
    setReviewingId(bookingId);
    setReviewRating(5);
    setReviewComment('');
    setReviewError('');
  }

  async function handleReviewSubmit(e: React.FormEvent, bookingId: string) {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError('');

    try {
      await createReview({ bookingId, rating: reviewRating, comment: reviewComment || undefined });
      setReviewedIds((prev) => [...prev, bookingId]);
      setReviewingId(null);
    } catch (err: any) {
      setReviewError(err.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-teal-800">Loading...</p>
      </main>
    );
  }

  const isArtisan = user?.role === 'artisan';

  const statusCounts = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const statLabels: { key: string; label: string }[] = isArtisan
    ? [
        { key: 'requested', label: 'New requests' },
        { key: 'accepted', label: 'Accepted' },
        { key: 'in_progress', label: 'In progress' },
        { key: 'completed', label: 'Completed' },
      ]
    : [
        { key: 'requested', label: 'Pending' },
        { key: 'in_progress', label: 'In progress' },
        { key: 'completed', label: 'Completed' },
      ];

  return (
    <main className="min-h-screen bg-sand-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
          Dashboard
        </p>
        <h1 className="font-display text-4xl text-teal-900 mb-6">
          Welcome back
        </h1>

        {!bookingsLoading && bookings.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {statLabels.map(({ key, label }) => (
              <div
                key={key}
                className="bg-white border border-teal-800/10 rounded-sm p-4 text-center"
              >
                <p className="font-display text-2xl text-teal-900">
                  {statusCounts[key] || 0}
                </p>
                <p className="font-body text-xs text-teal-800/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        )}

        {isArtisan && myProfile && (
          <div className="bg-white border border-teal-800/10 rounded-sm p-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-body font-medium text-teal-900">
                  {myProfile.ratingCount > 0
                    ? `★ ${myProfile.ratingAvg.toFixed(1)} rating (${myProfile.ratingCount} review${myProfile.ratingCount !== 1 ? 's' : ''})`
                    : 'No reviews yet'}
                </p>
                <Link
                  href={`/artisan/${myProfile._id}`}
                  className="font-body text-sm text-terracotta-600 hover:underline"
                >
                  View my public profile →
                </Link>
              </div>

              <div className="text-right">
                <p className="font-body text-sm text-teal-900 mb-1">
                  {myProfile.isAvailable ? 'Marked as available' : 'Marked as unavailable'}
                </p>
                <button
                  onClick={handleAvailabilityToggle}
                  disabled={availabilityLoading}
                  className={`font-body px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                    myProfile.isAvailable
                      ? 'bg-terracotta-600 hover:bg-terracotta-700 text-sand-50'
                      : 'border border-teal-800/30 text-teal-900'
                  }`}
                >
                  {availabilityLoading
                    ? 'Updating...'
                    : myProfile.isAvailable
                    ? 'Available now'
                    : 'Mark as available'}
                </button>
                {availabilityError && (
                  <p className="font-body text-red-600 text-xs mt-1">{availabilityError}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-teal-800/10 rounded-sm p-6 mb-8">
          <p className="font-body text-teal-800">
            <span className="text-teal-900 font-medium">User ID:</span> {user?.userId}
          </p>
          <p className="font-body text-teal-800 mt-2">
            <span className="text-teal-900 font-medium">Role:</span> {user?.role}
          </p>
        </div>

        <h2 className="font-display text-2xl text-teal-900 mb-4">
          {isArtisan ? 'Incoming requests' : 'My bookings'}
        </h2>

        {actionError && (
          <p className="font-body text-red-600 mb-4">{actionError}</p>
        )}

        {bookingsLoading ? (
          <p className="font-body text-teal-800">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="font-body text-teal-800">
            {isArtisan
              ? "You haven't received any booking requests yet."
              : "You haven't requested any bookings yet."}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-teal-800/10 rounded-sm p-4"
              >
                <p className="font-body text-teal-900 font-medium capitalize">
                  {booking.status.replace('_', ' ')}
                </p>
                <p className="font-body text-teal-800 mt-1">
                  {booking.description}
                </p>
                <p className="font-body text-sm text-teal-800/60 mt-2">
                  Requested {new Date(booking.createdAt).toLocaleDateString()}
                </p>

                {isArtisan && booking.status === 'requested' && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(booking._id, 'accepted')}
                      disabled={updatingId === booking._id}
                      className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm"
                    >
                      {updatingId === booking._id ? 'Updating...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking._id, 'cancelled')}
                      disabled={updatingId === booking._id}
                      className="font-body border border-teal-800/30 hover:border-teal-800 text-teal-900 px-4 py-2 rounded-sm transition-colors text-sm"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {isArtisan && booking.status === 'accepted' && (
                  <button
                    onClick={() => handleStatusChange(booking._id, 'in_progress')}
                    disabled={updatingId === booking._id}
                    className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm mt-3"
                  >
                    {updatingId === booking._id ? 'Updating...' : 'Start job'}
                  </button>
                )}

                {isArtisan && booking.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(booking._id, 'completed')}
                    disabled={updatingId === booking._id}
                    className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm mt-3"
                  >
                    {updatingId === booking._id ? 'Updating...' : 'Mark completed'}
                  </button>
                )}

                {!isArtisan && booking.status === 'completed' && (
                  <>
                    {reviewedIds.includes(booking._id) ? (
                      <p className="font-body text-teal-800 font-medium mt-3">
                        Review submitted — thank you!
                      </p>
                    ) : reviewingId === booking._id ? (
                      <form
                        onSubmit={(e) => handleReviewSubmit(e, booking._id)}
                        className="mt-3 flex flex-col gap-2"
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className={`text-2xl ${
                                star <= reviewRating ? 'text-terracotta-600' : 'text-teal-800/20'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <textarea
                          placeholder="Optional comment about the job"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="font-body w-full p-2 border border-teal-800/20 rounded-sm text-sm"
                        />
                        {reviewError && (
                          <p className="font-body text-red-600 text-sm">{reviewError}</p>
                        )}
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={reviewSubmitting}
                            className="font-body bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 px-4 py-2 rounded-sm transition-colors text-sm"
                          >
                            {reviewSubmitting ? 'Submitting...' : 'Submit review'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setReviewingId(null)}
                            className="font-body border border-teal-800/30 text-teal-900 px-4 py-2 rounded-sm text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => openReviewForm(booking._id)}
                        className="font-body border border-terracotta-600 text-terracotta-600 px-4 py-2 rounded-sm transition-colors text-sm mt-3"
                      >
                        Leave a review
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}