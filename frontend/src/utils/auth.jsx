/**
 * Type of JWT
 * @typedef {string} JWT_TYPE - [ACCESS_TOKEN, REFRESH_TOKEN, BOTH_TOKENS]
 */
const ACCESS_TOKEN = 'access';
const REFRESH_TOKEN = 'refresh';
const BOTH_TOKENS = 'both';

/**
 * Save JWT Token in localStorage
 * @param {JWT_TYPE} type - Type of token
 * @param {Object} payload - Tokens to be saved
 */
const setJwt = (type, payload) => {
  switch (type) {
    case ACCESS_TOKEN:
      localStorage.accessToken = payload.accessToken;
      break;
    case REFRESH_TOKEN:
      localStorage.accessToken = payload.refreshToken;
      break;
    case BOTH_TOKENS:
      localStorage.accessToken = payload.accessToken;
      localStorage.refreshToken = payload.refreshToken;
      break;
  }
};

/**
 * Returns JWT Token from localStorage
 * @param {JWT_TYPE} type - Type of token
 * @returns {string} - JWT Token
 */
const getJwt = (type) => {
  switch (type) {
    case ACCESS_TOKEN:
      return localStorage.accessToken;
    case REFRESH_TOKEN:
      return localStorage.refreshToken;
  }
};

/**
 * Clear JWT Tokens from localStorage
 */
const clearJwt = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Check if JWT Token is valid
 * @param {string} jwt - JWT Token
 * @returns {boolean} - Validity
 */
const isValidJwt = (jwt) => {
  if (!jwt || jwt.split('.').length < 3) {
    return false;
  }
  const data = JSON.parse(atob(jwt.split('.')[1]));
  const exp = new Date(data.exp * 1000); // JS deals with dates in milliseconds since epoch
  const now = new Date();
  return now < exp;
};

export {
  setJwt,
  getJwt,
  clearJwt,
  isValidJwt,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  BOTH_TOKENS,
};
