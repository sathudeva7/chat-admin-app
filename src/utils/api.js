import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // Other headers can be set here
  },
});


// Function to set authentication token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Export the configured axios instance
export default api;
