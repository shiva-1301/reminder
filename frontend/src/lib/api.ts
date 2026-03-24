/**
 * Get the API base URL based on environment
 * Uses VITE_API_BASE_URL environment variable in production
 * Falls back to localhost:8080 for development
 */
export const getApiUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

/**
 * Make an API request with proper error handling
 */
export const apiCall = async (endpoint, options = {}) => {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : text;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
