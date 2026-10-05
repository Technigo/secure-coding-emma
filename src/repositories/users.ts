import type Database from 'better-sqlite3';

export type UserRole = 'user' | 'support' | 'admin';

export interface User {
  id: number;
  email: string;
  display_name: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
}

export function getUserById(
  database: Database.Database,
  id: number,
): User | undefined {
  return database.prepare('SELECT * FROM users WHERE id = ?').get(id) as
    User | undefined;
}

export function getUserByEmail(
  database: Database.Database,
  email: string,
): User | undefined {
  return database.prepare('SELECT * FROM users WHERE email = ?').get(email) as
    User | undefined;
}

export function listUsers(database: Database.Database): User[] {
  return database.prepare('SELECT * FROM users ORDER BY id').all() as User[];
}

export function updateDisplayName(
  database: Database.Database,
  userId: number,
  displayName: string,
): void {
  database
    .prepare('UPDATE users SET display_name = ? WHERE id = ?')
    .run(displayName, userId);
}

export function updateUserProfile(
  database: Database.Database,
  userId: number,
  displayName: string,
  role: string,
): void {
  database
    .prepare('UPDATE users SET display_name = ?, role = ? WHERE id = ?')
    .run(displayName, role, userId);
}
