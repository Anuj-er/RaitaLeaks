// src/utils/apiConfig.js

// Determine if we're in production
const isProduction = import.meta.env.MODE === 'production';

// Use the environment variable in production, otherwise use relative path for local development
export const API_BASE_URL = isProduction 
  ? import.meta.env.VITE_API_BASE_URL || 'https://raitaleaks.onrender.com/api'
  : '/api';

// Helper function for API calls
export const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Ensure credentials are included for cross-domain requests
  const fetchOptions = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, fetchOptions);
    return response;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};