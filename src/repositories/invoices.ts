import type Database from 'better-sqlite3';

export interface Invoice {
  id: number;
  owner_user_id: number;
  invoice_number: string;
  amount_cents: number;
  status: 'paid' | 'due';
  billing_note: string;
  created_at: string;
}

export function getInvoiceById(
  database: Database.Database,
  id: number,
): Invoice | undefined {
  return database.prepare('SELECT * FROM invoices WHERE id = ?').get(id) as
    Invoice | undefined;
}

export function listInvoicesForUser(
  database: Database.Database,
  userId: number,
): Invoice[] {
  return database
    .prepare('SELECT * FROM invoices WHERE owner_user_id = ? ORDER BY id')
    .all(userId) as Invoice[];
}
