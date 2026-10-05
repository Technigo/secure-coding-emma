import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { config } from '../config.js';

export function openDatabase(): Database.Database {
  fs.mkdirSync(path.dirname(config.databasePath), { recursive: true });
  const database = new Database(config.databasePath);
  database.pragma('foreign_keys = ON');
  return database;
}
