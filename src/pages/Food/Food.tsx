import { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const restaurants = [
  {
    name: "The Royal Curry House",
    type: "Indian",
    price: "₹1,200 for two",
    rating: 4.6,
    img: "https://source.unsplash.com/400x300/?indian-food,restaurant",
  },
  {
    name: "Sushi World",
    type: "Japanese",
    price: "₹2,500 for two",
    rating: 4.8,
    img: "https://source.unsplash.com/400x300/?sushi,restaurant",
  },
  {
    name: "Bella Italia",
    type: "Italian",
    price: "₹1,800 for two",
    rating: 4.3,
    img: "https://source.unsplash.com/400x300/?italian-food,restaurant",
  },
];

export default function Food() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? restaurants
      : restaurants.filter((r) => r.type === filter);

  return (
    <div className="min-h-screen bg-light px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Find Food & Dining 🍴
      </h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["All", "Indian", "Japanese", "Italian"].map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setFilter(cuisine)}
            className={`px-4 py-2 rounded-lg ${
              filter === cuisine
                ? "bg-primary text-white"
                : "bg-light border text-neutral hover:bg-gray-100"
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Restaurant List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((r) => (
          <Card key={r.name}>
            <img
              src={r.img}
              alt={r.name}
              className="h-40 w-full object-cover rounded-card"
            />
            <div className="mt-3">
              <h2 className="text-xl font-semibold">{r.name}</h2>
              <p className="text-neutral">{r.type} • {r.price}</p>
              <p className="text-sm text-yellow-500">⭐ {r.rating}</p>
              <Button
                label="Add to Itinerary"
                onClick={() => alert(`Added ${r.name}`)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
