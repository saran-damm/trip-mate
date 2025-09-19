import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// Define the structure for a single day in the itinerary
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: {
    time: string;
    description: string;
    location?: string;
    coordinates?: { lat: number; lng: number };
  }[];
}

// Define the structure for the entire trip plan
export interface TripPlan {
  destination: string;
  country?: string;
  numberOfDays: number;
  interests: string[];
  budget?: { 
    perDay: number; 
    total: number; 
    currency: string; 
  };
  itinerary?: ItineraryDay[];
  centerCoordinates?: { lat: number; lng: number };
}

// Define the shape of the context
interface TripContextType {
  tripPlan: TripPlan | null;
  updateTripPlan: (plan: Partial<TripPlan>) => void;
  clearTripPlan: () => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

// Create the context with a default value
const TripContext = createContext<TripContextType | undefined>(undefined);

// Define the props for the provider
interface TripProviderProps {
  children: ReactNode;
}

// Create the provider component
export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateTripPlan = useCallback((planUpdate: Partial<TripPlan>) => {
    setTripPlan(prevPlan => ({
      ...(prevPlan || { destination: '', numberOfDays: 0, interests: [] }),
      ...planUpdate,
    }));
  }, []);

  const clearTripPlan = useCallback(() => {
    setTripPlan(null);
  }, []);

  const value = {
    tripPlan,
    updateTripPlan,
    clearTripPlan,
    isGenerating,
    setIsGenerating,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

// Create a custom hook for easy context consumption
export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
