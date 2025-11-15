const MOCK_CREDENTIALS = [
  { username: 'admin', password: 'password' },
  { username: 'user', password: 'pass123' },
  { username: 'demo', password: 'demo123' }
];

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;

export const generateMockToken = (username) => {
  const payload = {
    sub: username,
    iat: Date.now(),
    exp: Date.now() + 3600000 // 1 hour
  };
  return btoa(JSON.stringify(payload));
};

export const generateMockRefreshToken = (username) => {
  const payload = {
    sub: username,
    iat: Date.now(),
    exp: Date.now() + 86400000 // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

export const login = (username, password) => {
  const validCredential = MOCK_CREDENTIALS.find(
    cred => cred.username === username && cred.password === password
  );
  
  if (validCredential) {
    const token = generateMockToken(username);
    const refreshToken = generateMockRefreshToken(username);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    
    // Setup silent token refresh every 14 minutes
    setupTokenRefresh();
    
    return { success: true, token, refreshToken };
  }
  return { success: false };
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    return Date.now() >= payload.exp;
  } catch {
    return true;
  }
};

export const refreshToken = () => {
  const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshTokenValue || isTokenExpired(refreshTokenValue)) {
    logout();
    return null;
  }
  
  try {
    const payload = JSON.parse(atob(refreshTokenValue));
    const newToken = generateMockToken(payload.sub);
    localStorage.setItem(TOKEN_KEY, newToken);
    return newToken;
  } catch {
    logout();
    return null;
  }
};

let refreshInterval = null;

export const setupTokenRefresh = () => {
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  
  // Refresh token every 14 minutes (before 1 hour expiry)
  refreshInterval = setInterval(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      refreshToken();
    } else {
      clearInterval(refreshInterval);
    }
  }, 14 * 60 * 1000); // 14 minutes
};

export const checkAuth = () => {
  const token = getToken();
  if (!token) return false;
  
  if (isTokenExpired(token)) {
    const newToken = refreshToken();
    if (newToken) {
      setupTokenRefresh();
      return true;
    }
    return false;
  }
  
  setupTokenRefresh();
  return true;
};
