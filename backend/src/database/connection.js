import Database from 'better-sqlite3';
import { config } from '../config/env.js';

let dbInstance = null;

export function getDatabase() {
  if (!dbInstance) {
    dbInstance = new Database(config.databaseUrl);
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('foreign_keys = ON');
  }
  return dbInstance;
}

export function closeDatabase() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

