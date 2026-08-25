const API_URL = 'http://localhost:3000';

export interface CreateBookingParams {
  artisanProfileId: string;
  description: string;
  scheduledAt?: string;
}

export interface Booking {
  _id: string;
  customerId: string;
  artisanProfileId: string;
  description: string;
  status: string;
  scheduledAt?: string;
}

export async function createBooking(params: CreateBookingParams): Promise<Booking> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to book an artisan');
  }

  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to create booking');
  }

  return response.json();
}

export interface MyBooking {
  _id: string;
  customerId: string;
  artisanProfileId: string;
  description: string;
  status: string;
  scheduledAt?: string;
  createdAt: string;
}

export async function getMyBookings(role: 'customer' | 'artisan'): Promise<MyBooking[]> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to view bookings');
  }

  const response = await fetch(`${API_URL}/bookings?role=${role}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return response.json();
}

export async function updateBookingStatus(bookingId: string, status: string): Promise<Booking> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to update a booking');
  }

  const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to update booking');
  }

  return response.json();
}