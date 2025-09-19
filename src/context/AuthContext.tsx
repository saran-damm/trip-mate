import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getCurrentUser } from '../firebase/auth';

export interface User {
  user_id: string;
  email: string;
  name: string;
  profile_image?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        // User is signed in
        try {
          // Get the ID token
          const idToken = await firebaseUser.getIdToken();
          
          // Store the token in localStorage
          localStorage.setItem('auth_token', idToken);
          
          // Get user data from our helper function
          const userData = getCurrentUser();
          
          if (userData) {
            setUser(userData);
            setToken(idToken);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error processing authenticated user:', error);
          // Clear any invalid tokens
          localStorage.removeItem('auth_token');
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        // User is signed out
        localStorage.removeItem('auth_token');
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
