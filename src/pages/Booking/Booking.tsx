import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTrip } from '../../context/TripContext';
import { getBookingDetails } from '../../services/bookingService';
import type { BookingDetails } from '../../types/booking';
import TravelLoadingAnimation from '../../components/common/TravelLoadingAnimation';
import MapView from '../../components/maps/MapView';

export default function Booking() {
  const navigate = useNavigate();
  const { tripPlan } = useTrip();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripPlan) {
      // If there's no trip plan, redirect to the setup page
      navigate('/trip-setup');
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const details = await getBookingDetails(tripPlan);
        setBookingDetails(details);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [tripPlan, navigate]);

  if (loading) {
    return <TravelLoadingAnimation text="Finalizing your booking details..." />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-500">An Error Occurred</h2>
        <p className="text-neutral">{error}</p>
        <Button label="Go Back" onClick={() => navigate(-1)} className="mt-4" />
      </div>
    );
  }

  if (!tripPlan || !bookingDetails) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">No Booking Details Found</h2>
        <p className="text-neutral">We couldn't find any booking details for your trip.</p>
        <Button label="Plan a New Trip" onClick={() => navigate('/trip-setup')} className="mt-4" />
      </div>
    );
  }

  const { flights, accommodations, costBreakdown } = bookingDetails;
  const totalCost = costBreakdown.reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header with trip summary */}
      <section className="relative rounded-card overflow-hidden slide-up">
        <img 
          src={`https://source.unsplash.com/1200x600/?${tripPlan.destination}`}
          alt={tripPlan.destination} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {tripPlan.destination} Trip
          </h1>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-1">
              <span>🗓️</span>
              <span>{tripPlan.itinerary?.[0]?.activities?.[0]?.time.split(' ')[0]} - {tripPlan.itinerary?.[tripPlan.itinerary.length - 1]?.activities?.[0]?.time.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⏳</span>
              <span>{tripPlan.numberOfDays} Days</span>
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

      {/* Flight and Cost */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 slide-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">✈️ Flight Details</h2>
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
        
        <Card className="slide-up">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">💰 Cost Summary</h2>
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
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🏨 Accommodation</h2>
        {accommodations.map((acc, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6">
            <img 
              src={acc.image} 
              alt={acc.name} 
              className="rounded-card h-48 w-full md:w-64 object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{acc.name}</h3>
              <p className="text-neutral text-sm mb-2">{acc.address}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-neutral">Check-in</div>
                  <div className="font-medium">{acc.checkIn}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral">Check-out</div>
                  <div className="font-medium">{acc.checkOut}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral">Room Type</div>
                  <div className="font-medium">{acc.roomType}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral">Rating</div>
                  <div className="font-medium flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1">{acc.rating}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Amenities</div>
                <div className="flex flex-wrap gap-2">
                  {acc.amenities.map((amenity, i) => (
                    <span key={i} className="bg-light text-neutral text-xs px-2 py-1 rounded-full">{amenity}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>

      {/* Itinerary Summary */}
      {tripPlan.itinerary && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🗓️ Itinerary Overview</h2>
          <div className="space-y-4">
            {tripPlan.itinerary.map((day) => (
              <Card key={day.day} hoverable className="slide-up">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">{day.day}</div>
                  <div>
                    <h3 className="font-semibold">{day.title}</h3>
                    <p className="text-sm text-neutral">{day.description}</p>
                  </div>
                </div>
                <ul className="space-y-3 pl-4">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="text-sm bg-light px-2 py-1 rounded-full min-w-[60px] text-center">{activity.time}</div>
                      <div className="flex items-center gap-2">
                        <span>{activity.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Map Overview */}
      <Card className="slide-up">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">🗺️ Trip Map</h2>
        <div className="h-96 rounded-card overflow-hidden">
          {tripPlan.centerCoordinates && (
            <MapView
              center={[tripPlan.centerCoordinates.lat, tripPlan.centerCoordinates.lng]}
              markers={[
                // Hotel marker
                ...(accommodations[0].coordinates ? [{
                  position: [accommodations[0].coordinates.lat, accommodations[0].coordinates.lng] as [number, number],
                  popupText: accommodations[0].name,
                }] : []),
                // Activity markers
                ...(tripPlan.itinerary?.flatMap(day => 
                  day.activities
                    .filter(a => a.coordinates)
                    .map(a => ({ 
                      position: [a.coordinates!.lat, a.coordinates!.lng] as [number, number], 
                      popupText: a.description 
                    }))
                ) || []),
              ]}
            />
          )}
        </div>
      </Card>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-end">
        <Button label="Share Itinerary" variant="outline" icon="👥" onClick={() => navigate("/share-export")} />
        <Button label="Export PDF" variant="secondary" icon="📄" onClick={() => navigate("/share-export")} />
        <Button label="View E-Tickets" variant="primary" icon="🎟️" onClick={() => navigate("/payment")} />
      </div>
    </div>
  );
}
