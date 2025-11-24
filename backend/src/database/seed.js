import { getDatabase } from './connection.js';

const db = getDatabase();

// Приклад початкових даних (опціонально)
const sampleEvent = {
  id: crypto.randomUUID(),
  title: 'Чи досягне Bitcoin $100k у 2025?',
  description: 'Прогноз на досягнення BTC позначки $100,000',
  options_json: JSON.stringify(['Так', 'Ні', 'Можливо']),
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

