import { useState, useCallback, useMemo } from 'react';
import { useTrip } from '../context/TripContext';
import type { ItineraryDay } from '../context/TripContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useGenerateItinerary = () => {
  const { tripPlan, updateTripPlan } = useTrip();
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

      // Create a stable dependency to avoid re-running the effect unnecessarily.
  const stableTripDetails = useMemo(() => {
    if (!tripPlan) return null;
    return JSON.stringify({
      destination: tripPlan.destination,
      country: tripPlan.country,
      numberOfDays: tripPlan.numberOfDays,
      interests: tripPlan.interests,
      budget: tripPlan.budget,
    });
  }, [tripPlan]);

  const generate = useCallback(async () => {
    if (!tripPlan) {
      setError('Trip plan is not available.');
      return;
    }

    if (!API_KEY) {
      setError('Gemini API key is not configured. Please check your .env.local file.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setItinerary(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const { destination, country, numberOfDays, interests, budget } = tripPlan;

      const prompt = `
        Create a detailed ${numberOfDays}-day travel itinerary for a trip to ${destination}${country ? `, ${country}` : ''}.
        The traveler is interested in: ${interests.join(', ')}.
        The total budget for the trip is approximately ${budget?.total.toLocaleString()} ${budget?.currency || 'INR'}.
        Please provide a mix of activities (including some free ones) that align with this budget.
        For each day, provide a title, a brief description, and a list of activities with suggested times and coordinates.

        IMPORTANT: Respond with only the JSON object, with no other text or markdown formatting.
        The JSON object should follow this structure:
        {
          "centerCoordinates": { "lat": <latitude>, "lng": <longitude> },
          "itinerary": [
            {
              "day": <day_number>,
              "title": "<Day Title>",
              "description": "<Brief description of the day>",
              "activities": [
                {
                  "time": "<e.g., 9:00 AM>",
                  "description": "<Activity description>",
                  "location": "<Optional location>",
                  "coordinates": { "lat": <latitude>, "lng": <longitude> }
                }
              ]
            }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Check for content wrapped in ```json``` and parse it
      const jsonMatch = text.match(/```json([\s\S]*?)```/);
      let parsed;
      if (jsonMatch) {
        const jsonString = jsonMatch[1].trim();
        parsed = JSON.parse(jsonString);
      } else {
        parsed = JSON.parse(text);
      }
      setItinerary(parsed.itinerary);
      // Also update the trip plan with the center coordinates
      updateTripPlan({ centerCoordinates: parsed.centerCoordinates });

    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError('Failed to generate itinerary. The AI may have returned an invalid response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [stableTripDetails, updateTripPlan]);

  return { generate, itinerary, isGenerating, error };
};
