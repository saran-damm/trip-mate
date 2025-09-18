import { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const transitOptions = {
  Flight: [
    { name: "Air India", duration: "3h 20m", cost: "₹12,500", timing: "10:00 AM - 1:20 PM" },
    { name: "IndiGo", duration: "3h 10m", cost: "₹9,800", timing: "2:00 PM - 5:10 PM" },
  ],
  Train: [
    { name: "Shatabdi Express", duration: "6h 40m", cost: "₹2,100", timing: "8:00 AM - 2:40 PM" },
    { name: "Rajdhani Express", duration: "6h 15m", cost: "₹2,800", timing: "9:00 AM - 3:15 PM" },
  ],
  Bus: [
    { name: "Volvo AC Sleeper", duration: "10h 30m", cost: "₹1,500", timing: "8:00 PM - 6:30 AM" },
    { name: "Luxury AC Coach", duration: "11h", cost: "₹1,200", timing: "9:00 PM - 8:00 AM" },
  ],
  Road: [
    { name: "Self-Drive Car", duration: "8h", cost: "₹4,000", timing: "Flexible" },
    { name: "Private Taxi", duration: "7h 30m", cost: "₹7,500", timing: "Flexible" },
  ],
};

export default function Transit() {
  const [mode, setMode] = useState<keyof typeof transitOptions>("Flight");

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">How Do You Want to Travel? 🚆✈️🚌🚗</h1>

      {/* Mode Tabs */}
      <div className="flex gap-3 mb-6">
        {Object.keys(transitOptions).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as keyof typeof transitOptions)}
            className={`px-4 py-2 rounded-lg ${
              mode === m
                ? "bg-primary text-white"
                : "bg-light border text-neutral hover:bg-gray-100"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Mode-Specific Display */}
      {mode !== "Road" ? (
        <div className="grid md:grid-cols-2 gap-6">
          {transitOptions[mode].map((opt, idx) => (
            <Card key={idx}>
              <h2 className="text-xl font-semibold">{opt.name}</h2>
              <p className="text-neutral">
                {opt.timing} • {opt.duration}
              </p>
              <p className="text-primary font-bold mt-2">{opt.cost}</p>
              <Button
                label="Select"
                onClick={() => alert(`Selected ${opt.name}`)}
              />
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-[400px] bg-neutral text-white flex items-center justify-center rounded-card shadow-card">
          🗺 Road Trip Map (show stops later with Mapbox)
        </div>
      )}
    </div>
  );
}
