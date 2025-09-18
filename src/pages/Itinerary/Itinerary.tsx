import { useState } from "react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { useNavigate } from "react-router-dom";
import WeatherPanel from "../../components/common/WeatherPanel";
import Icon from "../../components/common/IconProvider";

type DayPlan = {
  day: number;
  activities: { icon: string; iconType: string; text: string }[];
};

const itinerary: DayPlan[] = [
  {
    day: 1,
    activities: [
      { icon: "landmark", iconType: "landmark", text: "Visit City Museum" },
      { icon: "food", iconType: "utensils", text: "Lunch at Local Bistro" },
      { icon: "map-marker", iconType: "map-marker", text: "Evening Walk in Old Town" },
    ],
  },
  {
    day: 2,
    activities: [
      { icon: "mountain", iconType: "mountain", text: "Sunrise Trek" },
      { icon: "food", iconType: "utensils", text: "Street Food Tour" },
      { icon: "music", iconType: "music", text: "Nightlife Experience" },
    ],
  },
];

export default function Itinerary() {
    const navigate = useNavigate();
    const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Your Draft Itinerary <Icon icon="calendar" className="ml-2 text-primary" />
      </h1>

      {/* Day Tabs */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-3">
          {itinerary.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-4 py-2 rounded-lg ${
                activeDay === i
                  ? "bg-primary text-white"
                  : "bg-light border text-neutral hover:bg-gray-100"
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
        
        {/* Edit Day button moved here */}
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
      <div className="h-64 bg-neutral text-white flex items-center justify-center rounded-card shadow-card mb-6">
        <div className="flex flex-col items-center">
          <Icon icon="map-marker" size="3x" className="mb-3" />
          <span>Map Preview (integrate Mapbox/Google Maps later)</span>
        </div>
      </div>

      {/* Activities for the Day */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">
          Day {itinerary[activeDay].day} Plan
        </h2>
        <ul className="space-y-3 text-neutral">
          {itinerary[activeDay].activities.map((a, idx) => (
            <li key={idx} className="flex items-center gap-2 border-b pb-2 last:border-0">
              <span className="text-lg w-6 flex justify-center">
                <Icon icon={a.iconType as any} className="text-primary" />
              </span>
              {a.text}
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
