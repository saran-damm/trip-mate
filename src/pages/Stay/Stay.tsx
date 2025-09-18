import { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const hotels = [
  {
    name: "Grand Palace Hotel",
    price: "₹7,500 / night",
    rating: 4.5,
    img: "https://source.unsplash.com/400x300/?hotel,luxury",
  },
  {
    name: "Budget Inn",
    price: "₹2,200 / night",
    rating: 3.8,
    img: "https://source.unsplash.com/400x300/?hotel,budget",
  },
  {
    name: "Seaside Resort",
    price: "₹5,000 / night",
    rating: 4.2,
    img: "https://source.unsplash.com/400x300/?resort,sea",
  },
];

export default function Stay() {
  const [mapView, setMapView] = useState(false);

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Choose Your Stay 🏨
      </h1>

      {/* Toggle View */}
      <div className="flex justify-end mb-6">
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
          {hotels.map((hotel) => (
            <Card key={hotel.name}>
              <img
                src={hotel.img}
                alt={hotel.name}
                className="h-40 w-full object-cover rounded-card"
              />
              <div className="mt-3">
                <h2 className="text-xl font-semibold">{hotel.name}</h2>
                <p className="text-neutral">{hotel.price}</p>
                <p className="text-sm text-yellow-500">⭐ {hotel.rating}</p>
                <Button
                  label="Select"
                  onClick={() => alert(`Selected: ${hotel.name}`)}
                  variant="primary"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-[500px] bg-neutral text-white flex items-center justify-center rounded-card shadow-card">
          🗺 Map View (integrate Mapbox later with hotel markers)
        </div>
      )}
    </div>
  );
}
