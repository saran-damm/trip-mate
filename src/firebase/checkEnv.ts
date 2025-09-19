// Utility to check if all required Firebase environment variables are present
export const checkFirebaseEnv = (): { isValid: boolean; missingVars: string[] } => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  const missingVars = requiredVars.filter(varName => {
    const value = import.meta.env[varName];
    return !value || value === 'undefined' || value === '';
  });
  
  return {
    isValid: missingVars.length === 0,
    missingVars
  };
};
