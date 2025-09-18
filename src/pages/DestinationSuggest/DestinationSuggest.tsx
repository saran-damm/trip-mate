import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Icon from "../../components/common/IconProvider";

const destinations = [
  { name: "Paris", cost: "₹85,000", img: "https://source.unsplash.com/400x300/?paris" },
  { name: "Bali", cost: "₹55,000", img: "https://source.unsplash.com/400x300/?bali" },
  { name: "Jaipur", cost: "₹25,000", img: "https://source.unsplash.com/400x300/?jaipur" },
  { name: "Tokyo", cost: "₹95,000", img: "https://source.unsplash.com/400x300/?tokyo" },
];

export default function DestinationSuggest() {
  const [search, setSearch] = useState("");
  const [mapView, setMapView] = useState(false);
  const navigate = useNavigate();

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 flex items-center">
        Choose Your Destination <Icon icon={"globe" as const} className="ml-2 text-primary" />
      </h1>

      {/* Search + Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={() => setMapView(!mapView)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          {mapView ? "List View" : "Map View"}
        </button>
      </div>

      {/* Conditional Rendering */}
      {!mapView ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((dest) => (
            <Card key={dest.name}>
              <img src={dest.img} alt={dest.name} className="h-40 w-full object-cover rounded-card" />
              <div className="mt-3">
                <h2 className="text-xl font-semibold">{dest.name}</h2>
                <p className="text-neutral">From {dest.cost}</p>
                <Button
                  label="Select"
                  onClick={() => navigate("/itinerary")}
                  variant="primary"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-[500px] bg-neutral text-white flex items-center justify-center rounded-card shadow-card">
          <div className="flex flex-col items-center">
            <Icon icon={"map" as const} size="3x" className="mb-3" />
            <span>Map View (placeholder — integrate Mapbox/Google Maps later)</span>
          </div>
        </div>
      )}
    </div>
  );
}
