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