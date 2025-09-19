import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import WeatherPanel from "../../components/common/WeatherPanel";
import Icon from "../../components/common/IconProvider";
import { useTrip } from "../../context/TripContext";
import { useGenerateItinerary } from "../../hooks/useGenerateItinerary";
import MapView from "../../components/maps/MapView";

export default function Itinerary() {
  const navigate = useNavigate();
  const { tripPlan } = useTrip();
  const { generate, itinerary, isGenerating, error } = useGenerateItinerary();
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    // We only want to generate the itinerary once when the page loads.
    // An empty dependency array ensures this effect runs only on mount.
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-light flex flex-col items-center justify-center px-6 py-10">
        <Icon icon="rocket" spin className="text-primary text-5xl mb-4" />
        <h2 className="text-2xl font-semibold text-primary">Generating Your Itinerary...</h2>
        <p className="text-neutral mt-2">Our AI is crafting the perfect trip for you. Please wait a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light flex flex-col items-center justify-center px-6 py-10">
        <Icon icon="warning" className="text-red-500 text-5xl mb-4" />
        <h2 className="text-2xl font-semibold text-red-500">Error Generating Itinerary</h2>
        <p className="text-neutral mt-2">{error}</p>
        <Button label="Try Again" onClick={generate} className="mt-4" />
      </div>
    );
  }

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="min-h-screen bg-light flex flex-col items-center justify-center px-6 py-10">
        <h2 className="text-2xl font-semibold text-primary">No Itinerary Found</h2>
        <p className="text-neutral mt-2">We couldn't find an itinerary for your trip. Please go back and try again.</p>
        <Button label="Go Back" onClick={() => navigate('/trip-setup')} className="mt-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Your Draft Itinerary for {tripPlan?.destination} <Icon icon="calendar" className="ml-2 text-primary" />
      </h1>

      {/* Day Tabs */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {itinerary.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeDay === i
                  ? "bg-primary text-white"
                  : "bg-light border text-neutral hover:bg-gray-100"
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
        
        <Button 
          label={<>
            <Icon icon="pencil" className="mr-1" /> Edit Day
          </>} 
          onClick={() => navigate("/edit-itinerary")} 
          variant="outline"
          size="sm"
        />
      </div>

      {/* Map Preview */}
      <div className="h-96 rounded-card shadow-card mb-6 overflow-hidden">
        {tripPlan?.centerCoordinates && (
          <MapView 
            center={[tripPlan.centerCoordinates.lat, tripPlan.centerCoordinates.lng]}
            markers={itinerary[activeDay].activities
              .filter(a => a.coordinates)
              .map(a => ({ 
                position: [a.coordinates!.lat, a.coordinates!.lng], 
                popupText: a.description 
              }))
            }
          />
        )}
      </div>

      {/* Activities for the Day */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">
          {itinerary[activeDay].title}
        </h2>
        <p className="text-neutral mb-4">{itinerary[activeDay].description}</p>
        <ul className="space-y-3 text-neutral">
          {itinerary[activeDay].activities.map((a, idx) => (
            <li key={idx} className="flex items-center gap-3 border-b pb-2 last:border-0">
              <span className="font-semibold text-primary w-24">{a.time}</span>
              <span>{a.description}</span>
            </li>
          ))}
        </ul>
      </Card>
      {/* Weather Forecast Inline */}
      <WeatherPanel />
      
      {/* Option Buttons - Side by Side */}
      <div className="mt-6 mb-20">
        <h2 className="text-xl font-semibold mb-4">Plan Your Trip Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            label={<>
              <Icon icon="hotel" className="mr-2" /> Choose Stay
            </>} 
            onClick={() => navigate("/stay")} 
            variant="primary"
            size="lg"
            fullWidth
            className="py-6 text-lg"
          />
          <Button 
            label={<>
              <Icon icon="food" className="mr-2" /> Food Options
            </>} 
            onClick={() => navigate("/food")} 
            variant="primary"
            size="lg"
            fullWidth
            className="py-6 text-lg"
          />
          <Button 
            label={<>
              <Icon icon="train" className="mr-2" /> Transit Options
            </>} 
            onClick={() => navigate("/transit")} 
            variant="primary"
            size="lg"
            fullWidth
            className="py-6 text-lg"
          />
        </div>
        
        {/* Edit button moved to top beside day tabs */}
      </div>

      {/* Cost Summary */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex justify-between items-center">
        <span className="font-semibold text-neutral">Estimated Cost: ₹75,000</span>
        <Button label="Proceed to Booking" onClick={() => navigate("/booking")} />
      </div>
    </div>
  );
}
