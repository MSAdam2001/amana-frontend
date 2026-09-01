const API_URL = 'http://localhost:3000';

export interface ArtisanProfileDetail {
  _id: string;
  userId: string;
  tradeCategory: string;
  bio?: string;
  skills: string[];
  yearsExperience: number;
  serviceRadiusKm: number;
  portfolioPhotos: string[];
  isAvailable: boolean;
  verificationStatus: string;
  ratingAvg: number;
  ratingCount: number;
}

export async function getArtisanProfile(id: string): Promise<ArtisanProfileDetail> {
  const response = await fetch(`${API_URL}/profiles/artisan/${id}`);

  if (!response.ok) {
    throw new Error('Artisan profile not found');
  }

  return response.json();
}

export async function getMyArtisanProfile(): Promise<ArtisanProfileDetail> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to view your profile');
  }

  const response = await fetch(`${API_URL}/profiles/artisan/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load your profile');
  }

  return response.json();
}

export interface UpdateProfileParams {
  bio?: string;
  skills?: string[];
  yearsExperience?: number;
  portfolioPhotos?: string[];
  isAvailable?: boolean;
}

export async function updateMyArtisanProfile(params: UpdateProfileParams): Promise<ArtisanProfileDetail> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to update your profile');
  }

  const response = await fetch(`${API_URL}/profiles/artisan/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to update profile');
  }

  return response.json();
}

export async function uploadPhoto(file: File): Promise<string> {
  const token = localStorage.getItem('amana_token');

  if (!token) {
    throw new Error('You must be logged in to upload photos');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/uploads/photo`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to upload photo');
  }

  const data = await response.json();
  return data.url;
}