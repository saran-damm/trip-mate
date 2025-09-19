import { collection, getDocs } from 'firebase/firestore';
import { app, db } from './config';
import { seedInitialData } from './seed';

// Check if the database has been initialized with data
export const initializeFirebase = async (): Promise<void> => {
  try {
    console.log('Starting Firebase initialization...');
    console.log('Firebase app initialized with config:', {
      projectId: app.options.projectId,
      authDomain: app.options.authDomain,
      storageBucket: app.options.storageBucket,
      // Don't log sensitive information like API keys
    });
    
    // Try to seed the data regardless of permissions error
    try {
      // Check if destinations collection has data
      console.log('Checking if destinations collection exists...');
      const destinationsCollection = collection(db, 'destinations');
      
      console.log('Attempting to query destinations collection...');
      const snapshot = await getDocs(destinationsCollection);
      
      console.log(`Found ${snapshot.size} documents in destinations collection`);
      
      if (snapshot.empty) {
        console.log('Database is empty, seeding initial data...');
        await seedInitialData();
        console.log('Initial data seeding completed.');
      } else {
        console.log('Database already contains data, skipping initialization.');
      }
    } catch (firestoreError) {
      console.error('Error querying Firestore:', firestoreError);
      
      // If we get a permissions error, we'll continue with mock data
      if (String(firestoreError).includes('Missing or insufficient permissions')) {
        console.log('Permissions error detected. This is likely because the Firestore security rules need to be updated.');
        console.log('Please make sure you have deployed the updated security rules.');
        console.log('The application will use mock data until the rules are deployed.');
        
        // For permissions errors, we don't throw - we'll continue with mock data
        // This allows the app to work without properly configured Firebase rules
      } else {
        // For other errors, we'll re-throw
        throw new Error(`Firestore query failed: ${firestoreError instanceof Error ? firestoreError.message : String(firestoreError)}`);
      }
    }
    
    console.log('Firebase initialization completed successfully!');
    return; // Successfully initialized
  } catch (error) {
    console.error('Error during Firebase initialization:', error);
    
    // If it's a permissions error, we don't throw - we'll continue with mock data
    if (String(error).includes('Missing or insufficient permissions')) {
      console.log('Continuing with mock data due to permissions error.');
      return; // Return without throwing to allow the app to continue
    }
    
    throw error; // Re-throw other errors to be caught by the FirebaseInitializer component
  }
};
