 
const API_URL = 'http://localhost:3000';

export interface PendingArtisan {
  _id: string;
  userId: string;
  tradeCategory: string;
  bio?: string;
  skills: string[];
  yearsExperience: number;
  verificationStatus: string;
}

function getAuthHeaders() {
  const token = localStorage.getItem('amana_token');
  if (!token) {
    throw new Error('You must be logged in as an admin');
  }
  return { Authorization: `Bearer ${token}` };
}

export async function getPendingArtisans(): Promise<PendingArtisan[]> {
  const response = await fetch(`${API_URL}/profiles/artisan/pending`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to load pending artisans');
  }

  return response.json();
}

export async function setArtisanVerification(id: string, status: 'verified' | 'unverified'): Promise<void> {
  const response = await fetch(`${API_URL}/profiles/artisan/${id}/verify`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update verification status');
  }
}