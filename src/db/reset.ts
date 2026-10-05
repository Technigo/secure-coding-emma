import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { config } from '../config.js';
import { seed } from './seed.js';

export function resetDatabase(): void {
  fs.rmSync(config.databasePath, { force: true });
  fs.rmSync(`${config.databasePath}-journal`, { force: true });
  seed();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  resetDatabase();
  console.log('SecureHub database reset');
}
