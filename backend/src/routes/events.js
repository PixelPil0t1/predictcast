import { Hono } from 'hono';
import { EventService } from '../services/eventService.js';
import { authMiddleware } from '../middleware/auth.js';

export const eventsRouter = new Hono();
const eventService = new EventService();

// Get all active events
eventsRouter.get('/', c => {
  try {
    const events = eventService.getActiveEvents();
    return c.json(events);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Get specific event
eventsRouter.get('/:id', c => {
  try {
    const event = eventService.getEventById(c.req.param('id'));
    if (!event) return c.json({ error: 'Event not found' }, 404);
    return c.json(event);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Create new event (requires authentication)
eventsRouter.post('/', authMiddleware, async c => {
  try {
    const body = await c.req.json();
    const event = eventService.createEvent(body);
    return c.json(event, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Close event and set result (requires authentication)
eventsRouter.post('/:id/resolve', authMiddleware, async c => {
  try {
    const body = await c.req.json();
    const result = eventService.resolveEvent(c.req.param('id'), body.result);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

