import { useState } from 'react';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  withCredentials?: boolean;
}

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: (url: string, options?: ApiOptions) => Promise<T | null>;
}

// Base URL for API calls
const API_BASE_URL = 'http://localhost:8000';

export function useAPI<T = any>(): ApiResponse<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = async (endpoint: string, options: ApiOptions = {}): Promise<T | null> => {
    const {
      method = 'GET',
      headers = {},
      body,
      withCredentials = true,
    } = options;

    // Set loading state
    setState({ ...state, loading: true, error: null });

    try {
      // Prepare request options
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: withCredentials ? 'include' : 'omit',
      };

      // Add body if provided
      if (body) {
        if (body instanceof FormData) {
          // If it's FormData, remove Content-Type header to let browser set it
          const headers = requestOptions.headers as Record<string, string>;
          delete headers['Content-Type'];
          requestOptions.body = body;
        } else {
          requestOptions.body = JSON.stringify(body);
        }
      }

      // Make the request
      const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, requestOptions);

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle error responses
      if (!response.ok) {
        const error = new Error(
          typeof data === 'object' && data.detail
            ? data.detail
            : 'An error occurred'
        );
        setState({ data: null, loading: false, error });
        throw error;
      }

      // Update state with successful response
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error: errorObj });
      throw errorObj;
    }
  };

  return {
    ...state,
    execute,
  };
}
