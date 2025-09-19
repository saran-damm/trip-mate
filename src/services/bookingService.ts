import type { TripPlan } from '../context/TripContext';
import type { BookingDetails } from '../types/booking';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getBookingDetails = async (tripPlan: TripPlan): Promise<BookingDetails> => {
  if (!tripPlan) {
    throw new Error('Trip plan is not available.');
  }

  if (!API_KEY) {
    throw new Error('Gemini API key is not configured.');
  }

  const { destination, country, numberOfDays, budget } = tripPlan;

  const prompt = `
    You are a travel booking assistant. Based on the following trip plan, generate realistic booking suggestions.

    Trip Plan:
    - Destination: ${destination}${country ? `, ${country}` : ''}
    - Duration: ${numberOfDays} days
    - Budget: Approximately ${budget?.total.toLocaleString()} ${budget?.currency || 'INR'} for the entire trip.

    Please provide:
    1. **Return Flights**: Suggest one departure and one return flight.
    2. **Accommodation**: Suggest one hotel for the duration of the stay.
    3. **Cost Breakdown**: Provide an estimated cost breakdown for flights, accommodation, activities, food, and shopping.

    The total cost should align with the user's budget.

    IMPORTANT: Respond with only the JSON object, with no other text or markdown formatting. The JSON object must follow this exact structure:

    {
      "flights": [
        {
          "type": "Departure",
          "airline": "<Airline Name>",
          "flightNumber": "<Flight Number>",
          "departure": {
            "airport": "<3-letter IATA Code>",
            "city": "<Departure City>",
            "date": "<Departure Date, e.g., 24 Oct 2024>",
            "time": "<Departure Time, e.g., 22:45>"
          },
          "arrival": {
            "airport": "<3-letter IATA Code>",
            "city": "<Arrival City>",
            "date": "<Arrival Date, e.g., 25 Oct 2024>",
            "time": "<Arrival Time, e.g., 00:35>"
          },
          "duration": "<e.g., 3h 20m>",
          "price": 12500
        },
        {
          "type": "Return",
          "airline": "<Airline Name>",
          "flightNumber": "<Flight Number>",
          "departure": {
            "airport": "<3-letter IATA Code>",
            "city": "<Departure City>",
            "date": "<Return Date>",
            "time": "<Return Time>"
          },
          "arrival": {
            "airport": "<3-letter IATA Code>",
            "city": "<Arrival City>",
            "date": "<Return Arrival Date>",
            "time": "<Return Arrival Time>"
          },
          "duration": "<e.g., 3h 00m>",
          "price": 14500
        }
      ],
      "accommodations": [
        {
          "name": "<Hotel Name>",
          "address": "<Hotel Address>",
          "checkIn": "<Check-in Date>",
          "checkOut": "<Check-out Date>",
          "roomType": "<e.g., Ocean King Room>",
          "price": 150000,
          "image": "https://source.unsplash.com/600x400/?hotel,${destination},luxury",
          "amenities": ["<Amenity 1>", "<Amenity 2>"],
          "rating": 4.9,
          "coordinates": { "lat": <latitude>, "lng": <longitude> }
        }
      ],
      "costBreakdown": [
        { "category": "Flights", "amount": 27000, "icon": "✈️" },
        { "category": "Accommodation", "amount": 150000, "icon": "🏨" },
        { "category": "Activities", "amount": 25000, "icon": "🎢" },
        { "category": "Food & Dining", "amount": 30000, "icon": "🍴" },
        { "category": "Shopping", "amount": 20000, "icon": "🛍️" }
      ]
    }
  `;

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (jsonMatch) {
      const jsonString = jsonMatch[1].trim();
      return JSON.parse(jsonString) as BookingDetails;
    } else {
      return JSON.parse(text) as BookingDetails;
    }
  } catch (err) {
    console.error('Error generating booking details:', err);
    throw new Error('Failed to generate booking details from AI. Please try again.');
  }
};