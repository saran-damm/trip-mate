import { Suspense, lazy, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Icon from "../../components/common/IconProvider";
import { useTrendingDestinations } from "../../hooks/useTrendingDestinations";
import type { TrendingDestination } from "../../types/destination";
import { AuthContext } from "../../context/AuthContext";

// Lazy load components
const ToastDemo = lazy(() => import('../../components/demo/ToastDemo'));
const LoadingDemo = lazy(() => import('../../components/demo/LoadingDemo'));

// Fallback trending destinations in case API fails
const fallbackDestinations = [
  { id: "fallback_1", name: "Paris", country: "France", price: 75000, imageUrl: "paris", flag: "FR", rating: 4.9, reviewCount: 15000 },
  { id: "fallback_2", name: "Bali", country: "Indonesia", price: 45000, imageUrl: "bali", flag: "ID", rating: 4.8, reviewCount: 12000 },
  { id: "fallback_3", name: "Jaipur", country: "India", price: 25000, imageUrl: "jaipur", flag: "IN", rating: 4.7, reviewCount: 8000 },
  { id: "fallback_4", name: "New York", country: "USA", price: 95000, imageUrl: "new-york", flag: "US", rating: 4.8, reviewCount: 14000 },
  { id: "fallback_5", name: "Tokyo", country: "Japan", price: 85000, imageUrl: "tokyo", flag: "JP", rating: 4.9, reviewCount: 16000 },
];

const categories = [
  { name: "Beach Getaways"},
  { name: "Mountain Escapes"},
  { name: "City Breaks"},
  { name: "Cultural Tours"},
];

export default function Home() {
  const navigate = useNavigate();
  const { destinations, isLoading, error } = useTrendingDestinations();
  const { user } = useContext(AuthContext);
  
  // Use API data if available, otherwise use fallback
  const displayDestinations = destinations.length > 0 ? destinations : fallbackDestinations;

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-card p-8 slide-up">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Hello, {user?.name || 'Explorer'}</span> <Icon icon={"hand-peace" as const} className="inline-block ml-1" />
            <span className="block mt-2">Ready to plan your next adventure?</span>
          </h1>
          <p className="text-neutral text-lg mb-6">
            Discover amazing destinations, create personalized itineraries, and book your dream vacation all in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              label="Plan My Trip" 
              size="lg" 
              icon={<Icon icon={"rocket" as const} />} 
              onClick={() => navigate("/trip-setup")} 
            />
            <Button 
              label="Explore Destinations" 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/destination-suggest")} 
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card hoverable animated className="slide-up" onClick={() => navigate("/trip-setup")}>
          <div className="flex flex-col items-center text-center p-4">
            <span className="text-4xl mb-3"><Icon icon={"pencil" as const} size="2x" /></span>
            <h3 className="font-semibold mb-1">Create Trip</h3>
            <p className="text-sm text-neutral">Start planning your next adventure</p>
          </div>
        </Card>
        
        <Card hoverable animated className="slide-up" onClick={() => navigate("/saved-trips")}>
          <div className="flex flex-col items-center text-center p-4">
            <span className="text-4xl mb-3"><Icon icon={"plane" as const} size="2x" /></span>
            <h3 className="font-semibold mb-1">My Trips</h3>
            <p className="text-sm text-neutral">View your saved itineraries</p>
          </div>
        </Card>
        
        <Card hoverable animated className="slide-up" onClick={() => navigate("/booking")}>
          <div className="flex flex-col items-center text-center p-4">
            <span className="text-4xl mb-3"><Icon icon={"hotel" as const} size="2x" /></span>
            <h3 className="font-semibold mb-1">Bookings</h3>
            <p className="text-sm text-neutral">Manage your reservations</p>
          </div>
        </Card>
        
        <Card hoverable animated className="slide-up" onClick={() => navigate("/profile")}>
          <div className="flex flex-col items-center text-center p-4">
            <span className="text-4xl mb-3"><Icon icon={"user" as const} size="2x" /></span>
            <h3 className="font-semibold mb-1">Profile</h3>
            <p className="text-sm text-neutral">Update your preferences</p>
          </div>
        </Card>
      </section>

      {/* Trending Destinations */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-primary">Trending</span> Destinations <Icon icon={"globe" as const} className="inline-block ml-1" />
          </h2>
          <Button 
            label="View All" 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/destination-suggest")} 
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} padding="none" className="overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card variant="error" className="p-4">
            <div className="flex items-center gap-2">
              <Icon icon={"warning" as const} className="text-error" />
              <p>Failed to load trending destinations. Please try again later.</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDestinations.slice(0, 6).map((place: TrendingDestination, index) => (
              <Card 
                key={place.id} 
                padding="none" 
                hoverable 
                className={`overflow-hidden ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''} slide-up`}
              >
                <div className="relative">
                  <img
                    src={place.imageUrl || `https://source.unsplash.com/600x400/?${place.name},travel,landmark`}
                    alt={place.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-accent text-dark px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <span className="font-bold">{place.flag}</span> {place.country}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <div className="flex items-center text-sm text-neutral">
                        <span className="text-yellow-500 flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              icon={"star" as const}
                              className={`text-yellow-500 ${i < Math.floor(place.rating) ? 'opacity-100' : i < place.rating ? 'opacity-50' : 'opacity-20'}`}
                            />
                          ))}
                        </span>
                        <span className="ml-1">{place.rating.toFixed(1)}</span>
                        <span className="ml-2">({place.reviewCount.toLocaleString()} reviews)</span>
                      </div>
                    </div>
                    <p className="text-primary font-bold">From ₹{place.price.toLocaleString()}</p>
                  </div>
                  <Button 
                    label="Explore" 
                    variant="primary" 
                    size="sm" 
                    fullWidth 
                    className="mt-4"
                    onClick={() => navigate(`/destination-suggest?place=${place.name}`)}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-primary">Explore</span> by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              hoverable 
              className="slide-up"
              onClick={() => navigate(`/destination-suggest?category=${category.name}`)}
            >
              <div className="flex flex-col items-center text-center py-6">
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Travel Tips */}
      <section>
        <Card variant="accent" className="slide-up">
          <div className="flex items-start gap-4">
            <span className="text-4xl"><Icon icon={"info" as const} size="2x" className="text-accent" /></span>
            <div>
              <h3 className="font-semibold text-lg mb-2">Travel Tip of the Day</h3>
              <p className="text-neutral">
                Always keep digital copies of your important travel documents in your email or cloud storage. 
                This can be a lifesaver if your physical documents are lost or stolen during your trip.
              </p>
            </div>
          </div>
        </Card>
      </section>
      
      {/* Toast Demo */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-primary">Interactive</span> Features
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Toast Demo */}
          <div className="slide-up" style={{ animationDelay: '100ms' }}>
            <Suspense fallback={<Card className="p-6">Loading demo...</Card>}>
              <ToastDemo />
            </Suspense>
          </div>
          
          {/* Loading Demo */}
          <div className="slide-up" style={{ animationDelay: '200ms' }}>
            <Suspense fallback={<Card className="p-6">Loading demo...</Card>}>
              <LoadingDemo />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
