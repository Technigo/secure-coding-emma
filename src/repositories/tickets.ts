import type Database from 'better-sqlite3';

export interface Ticket {
  id: number;
  owner_user_id: number;
  title: string;
  description: string;
  status: 'open' | 'closed';
  created_at: string;
}

export function getTicketById(
  database: Database.Database,
  id: number,
): Ticket | undefined {
  return database.prepare('SELECT * FROM tickets WHERE id = ?').get(id) as
    Ticket | undefined;
}

export function listTicketsForUser(
  database: Database.Database,
  userId: number,
): Ticket[] {
  return database
    .prepare('SELECT * FROM tickets WHERE owner_user_id = ? ORDER BY id')
    .all(userId) as Ticket[];
}

export function listAllTickets(database: Database.Database): Ticket[] {
  return database
    .prepare('SELECT * FROM tickets ORDER BY id')
    .all() as Ticket[];
}

export function searchTickets(
  database: Database.Database,
  query: string,
): Ticket[] {
  const sql = `SELECT * FROM tickets WHERE title LIKE '%${query}%' OR description LIKE '%${query}%' ORDER BY id`;
  return database.prepare(sql).all() as Ticket[];
}

export function searchTicketsForUser(
  database: Database.Database,
  userId: number,
  query: string,
): Ticket[] {
  const pattern = `%${query}%`;
  return database
    .prepare(
      'SELECT * FROM tickets WHERE owner_user_id = ? AND (title LIKE ? OR description LIKE ?) ORDER BY id',
    )
    .all(userId, pattern, pattern) as Ticket[];
}
