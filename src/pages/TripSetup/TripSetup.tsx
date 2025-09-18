import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Icon from "../../components/common/IconProvider";

export default function TripSetup() {
  const navigate = useNavigate();

  // State for each preference
  const [budget, setBudget] = useState(50000);
  const [style, setStyle] = useState("Mid");
  const [themes, setThemes] = useState<string[]>([]);
  const [travelers, setTravelers] = useState(1);
  const [dates, setDates] = useState({ start: "", end: "" });

  const toggleTheme = (theme: string) => {
    setThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  const handleSubmit = () => {
    console.log({ budget, style, themes, travelers, dates });
    navigate("/destination-suggest"); // go to next step
  };

  return (
    <div className="min-h-screen bg-light flex justify-center px-6 py-10">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-primary mb-4 flex items-center">
          Customize Your Trip <Icon icon={"magic" as const} className="ml-2 text-primary" />
        </h1>

        {/* Budget Slider */}
        <Card>
          <label className="font-semibold">Budget (₹ per person)</label>
          <input
            type="range"
            min="5000"
            max="200000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full mt-3"
          />
          <p className="mt-2 text-neutral">₹{budget.toLocaleString()}</p>
        </Card>

        {/* Travel Style */}
        <Card>
          <label className="font-semibold">Travel Style</label>
          <div className="flex gap-3 mt-3">
            {["Luxury", "Mid", "Budget"].map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-4 py-2 rounded-xl ${
                  style === s
                    ? "bg-primary text-white"
                    : "bg-light text-neutral border"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Card>

        {/* Themes */}
        <Card>
          <label className="font-semibold">What excites you?</label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {["Heritage", "Food", "Adventure", "Nightlife"].map((t) => (
              <button
                key={t}
                onClick={() => toggleTheme(t)}
                className={`p-4 rounded-xl text-center ${
                  themes.includes(t)
                    ? "bg-secondary text-white"
                    : "bg-light text-neutral border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Card>

        {/* Dates & Travellers */}
        <Card>
          <label className="font-semibold">Trip Dates</label>
          <div className="flex gap-4 mt-3">
            <input
              type="date"
              value={dates.start}
              onChange={(e) => setDates({ ...dates, start: e.target.value })}
              className="border rounded-lg px-3 py-2 flex-1"
            />
            <input
              type="date"
              value={dates.end}
              onChange={(e) => setDates({ ...dates, end: e.target.value })}
              className="border rounded-lg px-3 py-2 flex-1"
            />
          </div>

          <label className="font-semibold mt-4 block">Travellers</label>
          <input
            type="number"
            min="1"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="mt-2 border rounded-lg px-3 py-2 w-24"
          />
        </Card>

        {/* CTA */}
        <div className="flex justify-end">
          <Button 
            label={<>
              Generate My Trip <Icon icon={"rocket" as const} className="ml-1" />
            </>} 
            onClick={handleSubmit} 
          />
        </div>
      </div>
    </div>
  );
}
