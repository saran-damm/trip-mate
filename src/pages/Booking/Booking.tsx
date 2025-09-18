import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const trip = {
  destination: "Paris",
  dates: "12 Apr - 18 Apr 2025",
  duration: 7,
  travelers: 2,
  image: "https://source.unsplash.com/1200x600/?paris,eiffel",
};

const days = [
  {
    day: 1,
    date: "12 Apr 2025",
    activities: [
      { time: "09:00", activity: "Arrival at Charles de Gaulle Airport", icon: "🛫" },
      { time: "11:30", activity: "Check-in at Hotel de Paris", icon: "🏨" },
      { time: "13:00", activity: "Lunch at Café de Flore", icon: "🍽️" },
      { time: "15:00", activity: "Visit Eiffel Tower", icon: "🗼" },
      { time: "19:00", activity: "Seine River Dinner Cruise", icon: "🚢" },
    ],
  },
  {
    day: 2,
    date: "13 Apr 2025",
    activities: [
      { time: "08:30", activity: "Breakfast at Hotel", icon: "🥞" },
      { time: "10:00", activity: "Louvre Museum Tour", icon: "🏰" },
      { time: "13:30", activity: "Lunch at Le Bistrot", icon: "🍴" },
      { time: "15:30", activity: "Shopping at Champs-Élysées", icon: "🛍️" },
      { time: "20:00", activity: "Dinner at Le Jules Verne", icon: "🍽️" },
    ],
  },
];

const accommodations = [
  {
    name: "Hotel de Paris",
    address: "12 Rue de Rivoli, 75001 Paris",
    checkIn: "12 Apr 2025",
    checkOut: "18 Apr 2025",
    roomType: "Deluxe Double Room",
    price: 15000,
    image: "https://source.unsplash.com/600x400/?hotel,paris,luxury",
    amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning", "Room Service"],
    rating: 4.8,
  },
];

const flights = [
  {
    type: "Departure",
    airline: "Air France",
    flightNumber: "AF 217",
    departure: {
      airport: "DEL",
      city: "New Delhi",
      date: "12 Apr 2025",
      time: "01:30",
    },
    arrival: {
      airport: "CDG",
      city: "Paris",
      date: "12 Apr 2025",
      time: "07:45",
    },
    duration: "8h 15m",
    price: 42000,
  },
  {
    type: "Return",
    airline: "Lufthansa",
    flightNumber: "LH 761",
    departure: {
      airport: "CDG",
      city: "Paris",
      date: "18 Apr 2025",
      time: "13:20",
    },
    arrival: {
      airport: "DEL",
      city: "New Delhi",
      date: "19 Apr 2025",
      time: "01:05",
    },
    duration: "8h 45m",
    price: 38000,
  },
];

const costBreakdown = [
  { category: "Flights", amount: 80000, icon: "✈️" },
  { category: "Accommodation", amount: 15000, icon: "🏨" },
  { category: "Local Transport", amount: 5000, icon: "🚕" },
  { category: "Food & Dining", amount: 12000, icon: "🍴" },
  { category: "Activities & Tours", amount: 8000, icon: "🎪" },
  { category: "Shopping", amount: 10000, icon: "🛍️" },
];

export default function Booking() {
  const navigate = useNavigate();
  const totalCost = costBreakdown.reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header with trip summary */}
      <section className="relative rounded-card overflow-hidden slide-up">
        <img 
          src={trip.image} 
          alt={trip.destination} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {trip.destination} Trip
          </h1>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{trip.dates}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💭</span>
              <span>{trip.duration} Days</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span>{trip.travelers} Travelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Status */}
      <Card variant="primary" className="slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Booking Status</h2>
            <p className="text-neutral">Your trip is confirmed and ready to go!</p>
          </div>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-white text-sm font-medium">
            Confirmed
          </div>
        </div>
      </Card>

      {/* Tabs for different sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Flights */}
        <Card className="md:col-span-2 slide-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>✈️</span> Flight Details
          </h2>
          
          <div className="space-y-6">
            {flights.map((flight, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{flight.type} Flight</h3>
                  <span className="text-sm bg-light px-2 py-1 rounded-full">{flight.airline} {flight.flightNumber}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-2xl font-bold">{flight.departure.time}</div>
                    <div className="text-sm">{flight.departure.date}</div>
                    <div className="font-medium">{flight.departure.airport}</div>
                    <div className="text-sm text-neutral">{flight.departure.city}</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-neutral">{flight.duration}</div>
                    <div className="w-20 h-px bg-neutral/30 my-1"></div>
                    <div className="text-xs text-neutral">✈️</div>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <div className="text-2xl font-bold">{flight.arrival.time}</div>
                    <div className="text-sm">{flight.arrival.date}</div>
                    <div className="font-medium">{flight.arrival.airport}</div>
                    <div className="text-sm text-neutral">{flight.arrival.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Cost Summary */}
        <Card className="slide-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>💰</span> Cost Summary
          </h2>
          
          <ul className="divide-y">
            {costBreakdown.map((item) => (
              <li key={item.category} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.category}</span>
                </div>
                <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t-2 border-primary/20 flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-xl text-primary">₹{totalCost.toLocaleString()}</span>
          </div>
        </Card>
      </div>

      {/* Accommodation */}
      <Card className="slide-up">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🏨</span> Accommodation
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={accommodations[0].image} 
            alt={accommodations[0].name} 
            className="rounded-card h-48 w-full md:w-64 object-cover"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{accommodations[0].name}</h3>
            <p className="text-neutral text-sm mb-2">{accommodations[0].address}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-neutral">Check-in</div>
                <div className="font-medium">{accommodations[0].checkIn}</div>
              </div>
              <div>
                <div className="text-sm text-neutral">Check-out</div>
                <div className="font-medium">{accommodations[0].checkOut}</div>
              </div>
              <div>
                <div className="text-sm text-neutral">Room Type</div>
                <div className="font-medium">{accommodations[0].roomType}</div>
              </div>
              <div>
                <div className="text-sm text-neutral">Rating</div>
                <div className="font-medium flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1">{accommodations[0].rating}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-1">Amenities</div>
              <div className="flex flex-wrap gap-2">
                {accommodations[0].amenities.map((amenity, index) => (
                  <span 
                    key={index} 
                    className="bg-light text-neutral text-xs px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Itinerary Summary */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>🗓️</span> Itinerary Overview
        </h2>
        
        <div className="space-y-4">
          {days.map((day) => (
            <Card key={day.day} hoverable className="slide-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {day.day}
                </div>
                <div>
                  <h3 className="font-semibold">Day {day.day}</h3>
                  <p className="text-sm text-neutral">{day.date}</p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-4">
                {day.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="text-sm bg-light px-2 py-1 rounded-full min-w-[60px] text-center">
                      {activity.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{activity.icon}</span>
                      <span>{activity.activity}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Map Overview */}
      <Card className="slide-up">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🗺️</span> Trip Map
        </h2>
        
        <div className="h-64 bg-neutral/10 rounded-card flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-neutral">Interactive map coming soon</p>
          </div>
        </div>
      </Card>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-end">
        <Button 
          label="Share Itinerary" 
          variant="outline" 
          icon="👥" 
          onClick={() => navigate("/share-export")} 
        />
        
        <Button 
          label="Export PDF" 
          variant="secondary" 
          icon="📄" 
          onClick={() => navigate("/share-export")} 
        />

        <Button
          label="View E-Tickets"
          variant="primary"
          icon="🎟️"
          onClick={() => navigate("/payment")}
        />
      </div>
    </div>
  );
}
