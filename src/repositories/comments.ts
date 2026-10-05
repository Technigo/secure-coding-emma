import type Database from 'better-sqlite3';

export interface Comment {
  id: number;
  ticket_id: number;
  author_user_id: number;
  body: string;
  created_at: string;
}

export function listCommentsForTicket(
  database: Database.Database,
  ticketId: number,
): Comment[] {
  return database
    .prepare('SELECT * FROM comments WHERE ticket_id = ? ORDER BY id')
    .all(ticketId) as Comment[];
}

export function createComment(
  database: Database.Database,
  ticketId: number,
  authorUserId: number,
  body: string,
  createdAt: string,
): number {
  const result = database
    .prepare(
      'INSERT INTO comments (ticket_id, author_user_id, body, created_at) VALUES (?, ?, ?, ?)',
    )
    .run(ticketId, authorUserId, body, createdAt);
  return Number(result.lastInsertRowid);
}
