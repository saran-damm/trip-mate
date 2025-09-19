import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  resetPassword as resetPasswordFirebase,
  type LoginCredentials,
  type RegisterData
} from '../firebase/auth';

export function useAuth() {
  const { user, setUser, token, setToken, isAuthenticated, setIsAuthenticated, loading } = useContext(AuthContext);

  // Register a new user
  const register = async (userData: RegisterData) => {
    try {
      const response = await registerUser(userData);
      
      if (response && response.user) {
        setUser(response.user);
        // Store token
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          setToken(response.token);
          setIsAuthenticated(true);
        }
      }

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login user
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await loginUser(credentials);

      if (response && response.user) {
        setUser(response.user);
        // Store token
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          setToken(response.token);
          setIsAuthenticated(true);
        }
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await logoutUser();
      
      // Clear user data and token from state
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      
      // Remove token from localStorage
      localStorage.removeItem('auth_token');

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const response = await resetPasswordFirebase(email);
      return response;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    resetPassword,
  };
}
