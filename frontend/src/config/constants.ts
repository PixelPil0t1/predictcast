export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE || 'http://localhost:3001/api',
  TIMEOUT: 10000,
};

export const WALLET_CONFIG = {
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID || 'PREDICTCAST_DEMO',
  APP_NAME: 'PredictCast',
  APP_DESCRIPTION: 'Event prediction platform with Web3',
  APP_URL: 'https://predictcast.app',
};

export const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  CREATE: '/create',
  MY_PREDICTIONS: '/my-predictions',
} as const;

export const CATEGORIES = [
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'sports', label: 'Sports' },
  { value: 'politics', label: 'Politics' },
  { value: 'tech', label: 'Technology' },
  { value: 'general', label: 'General' },
] as const;

