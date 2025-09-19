import { seedTrendingDestinations } from './trips';

// Function to seed all initial data
export const seedInitialData = async () => {
  try {
    console.log('Starting to seed initial data...');
    
    // Seed trending destinations
    await seedTrendingDestinations();
    
    console.log('Initial data seeding completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding initial data:', error);
    return { success: false, error };
  }
};

// Run seeding if this file is executed directly
// Note: This check won't work in browser environments, but is kept for potential Node.js usage
if (typeof process !== 'undefined' && process.argv[1] === import.meta.url) {
  seedInitialData()
    .then((result) => {
      if (result.success) {
        console.log('Seeding completed successfully!');
      } else {
        console.error('Seeding failed:', result.error);
      }
    })
    .catch((error) => {
      console.error('Unexpected error during seeding:', error);
    });
}
