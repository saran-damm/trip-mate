import { useEffect, useState } from 'react';
import { initializeFirebase } from '../../firebase/init';
import { checkFirebaseEnv } from '../../firebase/checkEnv';

interface FirebaseInitializerProps {
  children: React.ReactNode;
}

export const FirebaseInitializer: React.FC<FirebaseInitializerProps> = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [missingEnvVars, setMissingEnvVars] = useState<string[]>([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check environment variables first
        const { isValid, missingVars } = checkFirebaseEnv();
        if (!isValid) {
          setMissingEnvVars(missingVars);
          throw new Error('Missing Firebase environment variables');
        }
        
        console.log('Starting Firebase initialization...');
        try {
          await initializeFirebase();
          console.log('Firebase initialization completed!');
        } catch (firebaseErr) {
          // If it's a permissions error, we can continue with mock data
          if (String(firebaseErr).includes('Missing or insufficient permissions')) {
            console.log('Continuing with mock data due to permissions error.');
            // We don't set an error here, just log it and continue
          } else {
            // For other errors, we'll throw them to be caught by the outer catch
            throw firebaseErr;
          }
        }
        setIsInitializing(false);
      } catch (err) {
        console.error('Failed to initialize Firebase:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize Firebase'));
        setIsInitializing(false);
      }
    };
    
    initialize();
  }, []);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Initializing App...</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Please wait while we set things up</p>
        </div>
      </div>
    );
  }

  if (error) {
    // Check if it's a permissions error
    const isPermissionsError = error.message.includes('Missing or insufficient permissions');
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-6 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Firebase Initialization Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{error.message}</p>
          
          {missingEnvVars.length > 0 && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded text-left">
              <p className="font-medium text-red-800 dark:text-red-300">Missing environment variables:</p>
              <ul className="list-disc list-inside mt-1 text-sm text-red-700 dark:text-red-400">
                {missingEnvVars.map(varName => (
                  <li key={varName}>{varName}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                Please check your .env.local file and make sure all required variables are set.
              </p>
            </div>
          )}
          
          {isPermissionsError && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded text-left">
              <p className="font-medium text-yellow-800 dark:text-yellow-300">Firebase Permissions Error</p>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                This error is likely due to Firestore security rules. You need to deploy the updated security rules to your Firebase project.
              </p>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                Run the following command in your terminal:
              </p>
              <pre className="mt-1 p-2 bg-gray-800 text-white rounded overflow-x-auto text-xs">
                firebase deploy --only firestore:rules
              </pre>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                Or use the deploy-rules.sh script we've created for you.
              </p>
            </div>
          )}
          
          <div className="mt-4 flex justify-center space-x-3">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Retry
            </button>
            
            {isPermissionsError && (
              <button 
                onClick={() => {
                  // Continue anyway - this will bypass the error and let the app continue
                  setError(null);
                }} 
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Continue Anyway
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
