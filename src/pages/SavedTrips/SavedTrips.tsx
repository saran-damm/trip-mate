import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const trips = [
  {
    id: 1,
    destination: "Paris",
    country: "France",
    dates: "12 Apr - 18 Apr 2025",
    cost: 75000,
    img: "https://source.unsplash.com/600x400/?paris,eiffel,travel",
    status: "upcoming",
    activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
  },
  {
    id: 2,
    destination: "Jaipur",
    country: "India",
    dates: "5 May - 8 May 2025",
    cost: 28000,
    img: "https://source.unsplash.com/600x400/?jaipur,fort,palace",
    status: "upcoming",
    activities: ["Amber Fort", "City Palace", "Hawa Mahal"],
  },
  {
    id: 3,
    destination: "Bali",
    country: "Indonesia",
    dates: "10 Feb - 18 Feb 2025",
    cost: 45000,
    img: "https://source.unsplash.com/600x400/?bali,beach,resort",
    status: "completed",
    activities: ["Ubud Monkey Forest", "Tegallalang Rice Terraces", "Uluwatu Temple"],
  },
];

export default function SavedTrips() {
  const navigate = useNavigate();
  const upcomingTrips = trips.filter(trip => trip.status === "upcoming");
  const pastTrips = trips.filter(trip => trip.status === "completed");
  
  return (
    <div className="space-y-10">
      {/* Header with action button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">My Trips</span> ✈️
        </h1>
        <Button 
          label="Plan New Trip" 
          icon="🚀" 
          onClick={() => navigate("/trip-setup")} 
        />
      </div>
      
      {/* Upcoming Trips */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-primary">Upcoming</span> Trips
        </h2>
        
        {upcomingTrips.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, index) => (
              <Card 
                key={trip.id} 
                padding="none" 
                hoverable 
                className={`overflow-hidden slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img
                    src={trip.img}
                    alt={trip.destination}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-accent text-dark px-3 py-1 rounded-full text-xs font-medium">
                    {trip.country}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{trip.destination}</h2>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Upcoming
                    </div>
                  </div>
                  
                  <p className="text-neutral mb-3">{trip.dates}</p>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Planned Activities:</h3>
                    <div className="flex flex-wrap gap-2">
                      {trip.activities.map((activity, i) => (
                        <span 
                          key={i} 
                          className="bg-light px-2 py-1 rounded-full text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-primary font-bold">
                      ₹{trip.cost.toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        label="View" 
                        size="sm" 
                        onClick={() => navigate("/itinerary")} 
                      />
                      <Button 
                        label="Edit" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate("/edit-itinerary")} 
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card variant="accent">
            <div className="text-center py-8">
              <p className="text-lg mb-4">No upcoming trips yet!</p>
              <Button 
                label="Plan Your First Trip" 
                onClick={() => navigate("/trip-setup")} 
              />
            </div>
          </Card>
        )}
      </section>
      
      {/* Past Trips */}
      {pastTrips.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-primary">Past</span> Trips
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pastTrips.map((trip) => (
              <Card 
                key={trip.id} 
                hoverable 
                className="slide-up"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={trip.img}
                    alt={trip.destination}
                    className="h-20 w-20 object-cover rounded-card"
                  />
                  <div>
                    <h3 className="font-semibold">{trip.destination}</h3>
                    <p className="text-sm text-neutral">{trip.dates}</p>
                    <Button 
                      label="View Memories" 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate("/itinerary")} 
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      {/* Travel Stats */}
      <section>
        <Card variant="primary" className="slide-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold">{trips.length}</h3>
              <p className="text-sm">Total Trips</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">3</h3>
              <p className="text-sm">Countries Visited</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">18</h3>
              <p className="text-sm">Days Traveled</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">₹148,000</h3>
              <p className="text-sm">Total Spent</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
