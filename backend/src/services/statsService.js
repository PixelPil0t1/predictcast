import { getDatabase } from '../database/connection.js';

export class StatsService {
  constructor() {
    this.db = getDatabase();
  }

  getEventStats(eventId) {
    const total = this.db.prepare(`
      SELECT COUNT(*) as count FROM user_predictions WHERE event_id = ?
    `).get(eventId)?.count || 0;

    const breakdown = this.db.prepare(`
      SELECT 
        selected_option as option, 
        COUNT(*) as count
      FROM user_predictions
      WHERE event_id = ?
      GROUP BY selected_option
      ORDER BY count DESC
    `).all(eventId);

    return { 
      total, 
      breakdown: breakdown.map(b => ({
        option: b.option,
        count: b.count,
        percentage: total > 0 ? Math.round((b.count / total) * 100) : 0
      }))
    };
  }

  getUserStats(userAddress) {
    const totalPredictions = this.db.prepare(`
      SELECT COUNT(*) as count FROM user_predictions WHERE user_address = ?
    `).get(userAddress)?.count || 0;

    const correctPredictions = this.db.prepare(`
      SELECT COUNT(*) as count 
      FROM user_predictions p
      JOIN events e ON p.event_id = e.id
      WHERE p.user_address = ? 
        AND e.final_result IS NOT NULL 
        AND p.selected_option = e.final_result
    `).get(userAddress)?.count || 0;

    const resolvedEvents = this.db.prepare(`
      SELECT COUNT(*) as count 
      FROM user_predictions p
      JOIN events e ON p.event_id = e.id
      WHERE p.user_address = ? AND e.final_result IS NOT NULL
    `).get(userAddress)?.count || 0;

    return {
      totalPredictions,
      correctPredictions,
      resolvedEvents,
      accuracy: resolvedEvents > 0 ? Math.round((correctPredictions / resolvedEvents) * 100) : 0
    };
  }
}

