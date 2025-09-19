import { useEffect, useState } from 'react';
import type { TrendingDestination } from '../types/destination';
import { getTrendingDestinations } from '../firebase/trips';

export const useTrendingDestinations = () => {
  const [destinations, setDestinations] = useState<TrendingDestination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrendingDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await getTrendingDestinations();
        if (response && response.destinations) {
          setDestinations(response.destinations);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch trending destinations'));
        setIsLoading(false);
      }
    };

    fetchTrendingDestinations();
  }, []);

  return { destinations, isLoading, error };
};
