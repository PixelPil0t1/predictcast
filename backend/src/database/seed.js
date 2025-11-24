import { getDatabase } from './connection.js';

const db = getDatabase();

// Sample initial data (optional)
const sampleEvent = {
  id: crypto.randomUUID(),
  title: 'Will Bitcoin reach $100k in 2025?',
  description: 'Prediction for BTC reaching $100,000 milestone',
  options_json: JSON.stringify(['Yes', 'No', 'Maybe']),
  creator_address: '0xSampleCreator',
  created_at: Date.now(),
  closes_at: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 днів
  is_active: 1,
  category: 'crypto'
};

try {
  db.prepare(`
    INSERT INTO events (id, title, description, options_json, creator_address, created_at, closes_at, is_active, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    sampleEvent.id,
    sampleEvent.title,
    sampleEvent.description,
    sampleEvent.options_json,
    sampleEvent.creator_address,
    sampleEvent.created_at,
    sampleEvent.closes_at,
    sampleEvent.is_active,
    sampleEvent.category
  );
  console.log('✅ Sample event created');
} catch (e) {
  console.log('ℹ️  Sample data already exists or error:', e.message);
}

