import { Hono } from 'hono';
import { PredictionService } from '../services/predictionService.js';

export const predictionsRouter = new Hono();
const predictionService = new PredictionService();

// Зробити прогноз
predictionsRouter.post('/', async c => {
  try {
    const body = await c.req.json();
    const prediction = predictionService.createPrediction(body);
    return c.json(prediction, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

// Отримати прогнози користувача
predictionsRouter.get('/user/:address', c => {
  try {
    const predictions = predictionService.getUserPredictions(c.req.param('address'));
    return c.json(predictions);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Отримати прогнози для конкретної події
predictionsRouter.get('/event/:eventId', c => {
  try {
    const predictions = predictionService.getEventPredictions(c.req.param('eventId'));
    return c.json(predictions);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

