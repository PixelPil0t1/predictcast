import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createServer } from 'node:http';
import { eventsRouter } from './routes/events.js';
import { predictionsRouter } from './routes/predictions.js';
import { statsRouter } from './routes/stats.js';
import { config } from './config/env.js';

const app = new Hono();

// Middleware
app.use('*', cors({ 
  origin: config.corsOrigins, 
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'] 
}));

// Health check
app.get('/api/health', c => c.json({ 
  status: 'ok', 
  timestamp: Date.now(),
  version: '1.0.0'
}));

// Routes
app.route('/api/events', eventsRouter);
app.route('/api/predictions', predictionsRouter);
app.route('/api/stats', statsRouter);

// 404
app.notFound(c => c.json({ error: 'Not found' }, 404));

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

const server = createServer(app.fetch);
server.listen(config.port, () => {
  console.log(`🚀 PredictCast API running on http://localhost:${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
});

