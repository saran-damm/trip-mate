export interface TrendingDestination {
  id: string;
  name: string;
  country: string;
  flag: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
}

export interface TrendingDestinationsResponse {
  destinations: TrendingDestination[];
}
