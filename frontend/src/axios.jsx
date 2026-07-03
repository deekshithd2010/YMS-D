import axios from 'axios';
import { ACCESS_TOKEN, clearJwt, getJwt } from './utils/auth';

// Axios instance
const HTTP = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

// Request interceptor
HTTP.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Token expired'
    ) {
      clearJwt();
      removeDefaultAuthHeader();
      // TODO: Redirect to login page
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to get the auth header
 * @returns {string} Authorization header
 */
const AuthHeader = () => `Bearer ${getJwt(ACCESS_TOKEN)}`;

/**
 * Helper function to set default auth header
 */
const setDefaultAuthHeader = () => {
  HTTP.defaults.headers.common['Authorization'] = AuthHeader();
};

/**
 * Helper function to remove default auth header
 */
const removeDefaultAuthHeader = () => {
  HTTP.defaults.headers.common['Authorization'] = '';
};

export { HTTP, AuthHeader, setDefaultAuthHeader, removeDefaultAuthHeader };
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // backend server URL
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include token if available
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // or wherever you store token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
