// Determine if we're in production
const isProduction = import.meta.env.PROD;

// Use the environment variable in production, otherwise use relative path (which works with Vite's proxy)
export const API_BASE_URL = isProduction 
  ? import.meta.env.VITE_API_BASE_URL 
  : '';

// Helper function for API calls
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return response;
};