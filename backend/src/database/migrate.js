import { getDatabase } from './connection.js';

const db = getDatabase();

db.exec(`
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  options_json TEXT NOT NULL,
  creator_address TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  closes_at INTEGER NOT NULL,
  final_result TEXT,
  is_active INTEGER DEFAULT 1,
  category TEXT DEFAULT 'general'
);

CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_closes_at ON events(closes_at);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

CREATE TABLE IF NOT EXISTS user_predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL,
  user_address TEXT NOT NULL,
  selected_option TEXT NOT NULL,
  predicted_at INTEGER NOT NULL,
  UNIQUE(event_id, user_address),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_predictions_user ON user_predictions(user_address);
CREATE INDEX IF NOT EXISTS idx_predictions_event ON user_predictions(event_id);
`);

console.log('✅ Database migrated successfully');
console.log('📁 Tables: events, user_predictions');

