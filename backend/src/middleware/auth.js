import { config } from '../config/env.js';

export function authMiddleware(c, next) {
  const apiKey = c.req.header('x-api-key');
  
  if (!apiKey || apiKey !== config.apiSecret) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  return next();
}

