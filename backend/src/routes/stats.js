import { Hono } from 'hono';
import { StatsService } from '../services/statsService.js';

export const statsRouter = new Hono();
const statsService = new StatsService();

// Статистика по події
statsRouter.get('/event/:eventId', c => {
  try {
    const stats = statsService.getEventStats(c.req.param('eventId'));
    return c.json(stats);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Статистика по користувачу
statsRouter.get('/user/:address', c => {
  try {
    const stats = statsService.getUserStats(c.req.param('address'));
    return c.json(stats);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

