export interface Flight {
  type: 'Departure' | 'Return';
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    date: string;
    time: string;
  };
  arrival: {
    airport: string;
    city: string;
    date: string;
    time: string;
  };
  duration: string;
  price: number;
}

export interface Accommodation {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  price: number;
  image: string;
  amenities: string[];
  rating: number;
  coordinates?: { lat: number; lng: number };
}

export interface CostBreakdownItem {
  category: string;
  amount: number;
  icon: string;
}

export interface BookingDetails {
  flights: Flight[];
  accommodations: Accommodation[];
  costBreakdown: CostBreakdownItem[];
}
