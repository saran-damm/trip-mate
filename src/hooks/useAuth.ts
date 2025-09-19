import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAPI } from './useAPI';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  profile_image?: File;
}

export function useAuth() {
  const { user, setUser, token, setToken, isAuthenticated, setIsAuthenticated, loading } = useContext(AuthContext);
  const api = useAPI();

  // Register a new user
  const register = async (userData: RegisterData) => {
    try {
      // Create FormData for multipart/form-data request (for file upload)
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      
      if (userData.profile_image) {
        formData.append('profile_image', userData.profile_image);
      }

      const response = await api.execute('/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (response && response.user) {
        setUser(response.user);
        // If the backend returns a token, store it
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
      const response = await api.execute('/api/auth/login', {
        method: 'POST',
        body: credentials,
      });

      if (response && response.user) {
        setUser(response.user);
        // If the backend returns a token, store it
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
      const response = await api.execute('/api/auth/reset-password', {
        method: 'POST',
        body: { email },
      });

      return response;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // Validate token
  const validateToken = async (token: string) => {
    try {
      const response = await api.execute('/api/auth/validate-token', {
        method: 'POST',
        body: { token },
      });

      return response;
    } catch (error) {
      console.error('Token validation error:', error);
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
    validateToken,
  };
}
