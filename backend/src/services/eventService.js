import { getDatabase } from '../database/connection.js';

export class EventService {
  constructor() {
    this.db = getDatabase();
  }

  getActiveEvents() {
    return this.db.prepare(`
      SELECT 
        id, title, description, 
        options_json as optionsJson,
        creator_address as creatorAddress,
        created_at as createdAt,
        closes_at as closesAt,
        final_result as finalResult,
        is_active as isActive,
        category
      FROM events 
      WHERE is_active = 1 
      ORDER BY created_at DESC
    `).all().map(event => ({
      ...event,
      options: JSON.parse(event.optionsJson)
    }));
  }

  getEventById(id) {
    const event = this.db.prepare(`
      SELECT 
        id, title, description, 
        options_json as optionsJson,
        creator_address as creatorAddress,
        created_at as createdAt,
        closes_at as closesAt,
        final_result as finalResult,
        is_active as isActive,
        category
      FROM events 
      WHERE id = ?
    `).get(id);
    
    if (!event) return null;
    
    return {
      ...event,
      options: JSON.parse(event.optionsJson)
    };
  }

  createEvent({ title, description, options, closesAt, creatorAddress, category = 'general' }) {
    if (!title || !options || !Array.isArray(options) || options.length < 2) {
      throw new Error('Invalid event data');
    }
    
    const id = crypto.randomUUID();
    const now = Date.now();
    
    this.db.prepare(`
      INSERT INTO events (id, title, description, options_json, creator_address, created_at, closes_at, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, description || '', JSON.stringify(options), creatorAddress, now, closesAt, category);
    
    return this.getEventById(id);
  }

  resolveEvent(eventId, result) {
    this.db.prepare(`
      UPDATE events 
      SET is_active = 0, final_result = ?
      WHERE id = ?
    `).run(result, eventId);
    
    return { success: true, eventId, result };
  }
}

