'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyBookings, updateBookingStatus, MyBooking } from '@/lib/api/bookings';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ userId: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-sand-50 flex items-center justify-center">
        <p className="font-body text-teal-800">Loading...</p>
      </main>
    );
  }

  const isArtisan = user?.role === 'artisan';

  return (
    <main className="min-h-screen bg-sand-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-sm tracking-wide uppercase text-terracotta-600 mb-2">
          Dashboard
        </p>
        <h1 className="font-display text-4xl text-teal-900 mb-6">
          Welcome back
        </h1>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}