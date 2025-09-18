import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import TravelLoadingAnimation from '../common/TravelLoadingAnimation';
import LoadingOverlay from '../common/LoadingOverlay';

export default function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading your journey...');
  
  const loadingMessages = [
    'Finding the best flights...',
    'Searching for hotels...',
    'Planning your itinerary...',
    'Checking local attractions...',
    'Preparing your travel guide...',
  ];
  
  const simulateLoading = () => {
    setIsLoading(true);
    
    // Cycle through different loading messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 2000);
    
    // Stop loading after 10 seconds
    setTimeout(() => {
      clearInterval(messageInterval);
      setIsLoading(false);
      setLoadingMessage('Loading your journey...');
    }, 10000);
  };
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Travel-Themed Loading Animation</h2>
      <p className="text-neutral mb-6">
        Our custom loading animation features travel icons like planes, trains, and cars moving across the screen.
      </p>
      
      <div className="mb-6">
        <TravelLoadingAnimation size="md" />
      </div>
      
      <div className="border-t border-neutral/10 pt-6 mt-6">
        <h3 className="font-medium mb-3">Loading Overlay Demo</h3>
        <LoadingOverlay isLoading={isLoading} message={loadingMessage}>
          <div className="bg-light p-6 rounded-card min-h-[100px] flex items-center justify-center">
            <p className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}>
              Content will be covered by the loading overlay when active
            </p>
          </div>
        </LoadingOverlay>
        
        <div className="mt-4">
          <Button 
            label={isLoading ? "Loading..." : "Simulate Loading"} 
            onClick={simulateLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </Card>
  );
}
