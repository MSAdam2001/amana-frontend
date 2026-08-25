const API_URL = 'http://localhost:3000';

export interface ArtisanSearchResult {
  _id: string;
  userId: string;
  tradeCategory: string;
  ratingAvg?: number;
  ratingCount?: number;
  verificationStatus: string;
  distanceMeters: number;
  rankingScore: number;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

export interface SearchParams {
  longitude: number;
  latitude: number;
  category?: string;
  radiusKm?: number;
}

export async function searchArtisans(params: SearchParams): Promise<ArtisanSearchResult[]> {
  const query = new URLSearchParams({
    longitude: params.longitude.toString(),
    latitude: params.latitude.toString(),
    ...(params.category && { category: params.category }),
    ...(params.radiusKm && { radiusKm: params.radiusKm.toString() }),
  });

  const response = await fetch(`${API_URL}/search/artisans?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
}