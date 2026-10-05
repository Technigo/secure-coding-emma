import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase } from './connection.js';

const schemaPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'schema.sql',
);

export function migrateDatabase(): void {
  const database = openDatabase();
  try {
    database.exec(fs.readFileSync(schemaPath, 'utf8'));
  } finally {
    database.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  migrateDatabase();
  console.log('SecureHub database migrated');
}
