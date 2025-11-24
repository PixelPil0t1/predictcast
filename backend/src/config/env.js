export const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL || './predictcast.db',
  apiSecret: process.env.API_SECRET || '',
  corsOrigins: process.env.CORS_ORIGINS || '*',
  nodeEnv: process.env.NODE_ENV || 'development',
};

