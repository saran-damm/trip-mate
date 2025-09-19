import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './config';
import type { TrendingDestination, TrendingDestinationsResponse } from '../types/destination';

// Import local images
import delhiImg from '../assets/images/delhi.jpeg';
import goaImg from '../assets/images/goa.jpeg';
import mumbaiImg from '../assets/images/mumbai.jpeg';
import varanasiImg from '../assets/images/varanasi.jpeg';
import jaipurImg from '../assets/images/jaipur.jpeg';

// Collection references
const destinationsCollection = collection(db, 'destinations');

// Mock data for trending destinations (used as fallback when Firestore access fails)
const mockTrendingDestinations: TrendingDestination[] = [
  {
    id: "destination_1",
    name: "Delhi",
    country: "India",
    flag: "🇮🇳",
    imageUrl: delhiImg,
    price: 1500,
    rating: 4.8,
    reviewCount: 12000
  },
  {
    id: "destination_2",
    name: "Goa",
    country: "India",
    flag: "🇮🇳",
    imageUrl: goaImg,
    price: 2000,
    rating: 4.7,
    reviewCount: 8000
  },
  {
    id: "destination_3",
    name: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    imageUrl: mumbaiImg,
    price: 1800,
    rating: 4.6,
    reviewCount: 6000
  },
  {
    id: "destination_5",
    name: "Varanasi",
    country: "India",
    flag: "🇮🇳",
    imageUrl: varanasiImg,
    price: 1600,
    rating: 4.5,
    reviewCount: 8000
  },
  {
    id: "destination_6",
    name: "Jaipur",
    country: "India",
    flag: "🇮🇳",
    imageUrl: jaipurImg,
    price: 2500,
    rating: 4.9,
    reviewCount: 12000
  }
];

// Get trending destinations
export const getTrendingDestinations = async (): Promise<TrendingDestinationsResponse> => {
  // Directly return the mock data as requested.
  console.log('Using mock data for trending destinations.');
  const uniqueMockDestinations = Array.from(new Map(mockTrendingDestinations.map(d => [d.name, d])).values());
  return Promise.resolve({ destinations: uniqueMockDestinations });
};

// Seed initial trending destinations data
export const seedTrendingDestinations = async (): Promise<void> => {
  try {
    try {
      // Check if destinations already exist
      const snapshot = await getDocs(destinationsCollection);
      if (!snapshot.empty) {
        console.log('Destinations already seeded');
        return;
      }
    } catch (error) {
      // If we get a permissions error, log it and continue with seeding attempt
      if (String(error).includes('Missing or insufficient permissions')) {
        console.log('Cannot check if destinations exist due to permissions error. Attempting to seed anyway.');
      } else {
        throw error;
      }
    }
    
    // Initial data from the Python backend
    const initialDestinations = [
      {
        name: "Delhi",
        country: "India",
        flag: "🇮🇳",
        imageUrl: "../assets/images/delhi.jpg",
        price: 1500,
        rating: 4.8,
        reviewCount: 12000
      },
      {
        name: "Goa",
        country: "India",
        flag: "🇮🇳",
        imageUrl: "../assets/images/goa.jpg",
        price: 2000,
        rating: 4.7,
        reviewCount: 8000
      },
      {
        name: "Mumbai",
        country: "India",
        flag: "🇮🇳",
        imageUrl: "../assets/images/mumbai.jpg",
        price: 1800,
        rating: 4.6,
        reviewCount: 6000
      },
      {
        name: "Varanasi",
        country: "India",
        flag: "🇮🇳",
        imageUrl: "../assets/images/varanasi.jpg",
        price: 1600,
        rating: 4.5,
        reviewCount: 8000
      },
      {
        name: "Jaipur",
        country: "India",
        flag: "🇮🇳",
        imageUrl: "../assets/images/jaipur.jpg",
        price: 2500,
        rating: 4.9,
        reviewCount: 12000
      },
      {
        name: "Shimla",
        country: "India",
        flag: "🇮🇳",
        imageUrl: "../assets/images/shimla.jpg",
        price: 1800,
        rating: 4.6,
        reviewCount: 6000
      }
    ];
    
    try {
      // Add each destination to Firestore
      const batch = initialDestinations.map(destination => 
        addDoc(destinationsCollection, destination)
      );
      
      await Promise.all(batch);
      console.log('Destinations seeded successfully');
    } catch (writeError) {
      // If we get a permissions error during write, log it
      if (String(writeError).includes('Missing or insufficient permissions')) {
        console.log('Cannot seed destinations due to permissions error. Please deploy Firestore rules.');
        console.log('The application will use mock data until the rules are deployed.');
      } else {
        throw writeError;
      }
    }
  } catch (error) {
    console.error('Error seeding destinations:', error);
    // Don't throw the error, just log it and continue
    console.log('Continuing with mock data due to seeding error.');
  }
};
