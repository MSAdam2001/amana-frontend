const API_URL = 'http://localhost:3000';

export interface CreateReviewParams {
  bookingId: string;
  rating: number;
  comment?: string;
}

export interface Review {
  _id: string;
  bookingId: string;
  artisanProfileId: string;
  customerId: string;
  rating: number;
  comment?: string;
}

export async function createReview(params: CreateReviewParams): Promise<Review> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to leave a review');
  }

  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to submit review');
  }

  return response.json();
}