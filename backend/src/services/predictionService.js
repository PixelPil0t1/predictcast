import { getDatabase } from '../database/connection.js';

export class PredictionService {
  constructor() {
    this.db = getDatabase();
  }

  createPrediction({ eventId, userAddress, selectedOption }) {
    if (!eventId || !userAddress || !selectedOption) {
      throw new Error('Missing required fields');
    }

    // Check if event is active
    const event = this.db.prepare('SELECT is_active, closes_at FROM events WHERE id = ?').get(eventId);
    if (!event) throw new Error('Event not found');
    if (!event.is_active) throw new Error('Event is closed');
    if (Date.now() > event.closes_at) throw new Error('Event has ended');

    const now = Date.now();

    try {
      const result = this.db.prepare(`
        INSERT INTO user_predictions (event_id, user_address, selected_option, predicted_at)
        VALUES (?, ?, ?, ?)
      `).run(eventId, userAddress, selectedOption, now);
      
      return { 
        id: result.lastInsertRowid, 
        eventId, 
        userAddress, 
        selectedOption, 
        predictedAt: now 
      };
    } catch (error) {
      // If prediction exists - update it
      this.db.prepare(`
        UPDATE user_predictions 
        SET selected_option = ?, predicted_at = ?
        WHERE event_id = ? AND user_address = ?
      `).run(selectedOption, now, eventId, userAddress);
      
      return { eventId, userAddress, selectedOption, predictedAt: now, updated: true };
    }
  }

  getUserPredictions(userAddress) {
    return this.db.prepare(`
      SELECT 
        p.id,
        p.event_id as eventId,
        p.user_address as userAddress,
        p.selected_option as selectedOption,
        p.predicted_at as predictedAt,
        e.title,
        e.is_active as isActive,
        e.final_result as finalResult,
        e.closes_at as closesAt
      FROM user_predictions p
      JOIN events e ON p.event_id = e.id
      WHERE p.user_address = ?
      ORDER BY p.predicted_at DESC
    `).all(userAddress);
  }

  getEventPredictions(eventId) {
    return this.db.prepare(`
      SELECT 
        id,
        user_address as userAddress,
        selected_option as selectedOption,
        predicted_at as predictedAt
      FROM user_predictions
      WHERE event_id = ?
      ORDER BY predicted_at DESC
    `).all(eventId);
  }
}

