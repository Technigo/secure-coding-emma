import { fileURLToPath } from 'node:url';
import type Database from 'better-sqlite3';
import { hashPassword } from '../auth/password.js';
import { migrateDatabase } from './migrate.js';
import { openDatabase } from './connection.js';

const users = [
  {
    id: 1,
    email: 'alice@example.test',
    password: 'SecureHub!Alice1',
    displayName: 'Alice Andersson',
    role: 'user',
  },
  {
    id: 2,
    email: 'bob@example.test',
    password: 'SecureHub!Bob1',
    displayName: 'Bob Berg',
    role: 'user',
  },
  {
    id: 3,
    email: 'sara.support@example.test',
    password: 'SecureHub!Sara1',
    displayName: 'Sara Support',
    role: 'support',
  },
  {
    id: 4,
    email: 'admin@example.test',
    password: 'SecureHub!Admin1',
    displayName: 'Admin User',
    role: 'admin',
  },
] as const;

export function seedDatabase(database: Database.Database): void {
  const insert = database.transaction(() => {
    const insertUser = database.prepare(
      'INSERT INTO users (id, email, display_name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    );
    for (const user of users) {
      insertUser.run(
        user.id,
        user.email,
        user.displayName,
        hashPassword(user.password),
        user.role,
        '2026-01-01T09:00:00.000Z',
      );
    }

    const insertTicket = database.prepare(
      'INSERT INTO tickets (id, owner_user_id, title, description, status, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    );
    insertTicket.run(
      101,
      1,
      'Kan inte ladda ner faktura',
      'Nedladdningen stannar när fakturan ska öppnas.',
      'open',
      '2026-01-02T09:00:00.000Z',
    );
    insertTicket.run(
      102,
      1,
      'Ändra kontaktuppgifter',
      'Jag vill uppdatera telefonnumret på mitt konto.',
      'closed',
      '2026-01-03T09:00:00.000Z',
    );
    insertTicket.run(
      201,
      2,
      'Dubbeldebitering',
      'Jag ser samma fiktiva köp två gånger i översikten.',
      'open',
      '2026-01-04T09:00:00.000Z',
    );
    insertTicket.run(
      202,
      2,
      'Problem med inloggning',
      'Inloggningen misslyckas efter att lösenordet ändrats.',
      'open',
      '2026-01-05T09:00:00.000Z',
    );

    const insertInvoice = database.prepare(
      'INSERT INTO invoices (id, owner_user_id, invoice_number, amount_cents, status, billing_note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    );
    insertInvoice.run(
      1001,
      1,
      'INV-2026-1001',
      12900,
      'paid',
      'Intern referens: ALICE-PRIVATE-REF',
      '2026-01-06T09:00:00.000Z',
    );
    insertInvoice.run(
      1002,
      1,
      'INV-2026-1002',
      7900,
      'due',
      'Intern referens: ALICE-PRIVATE-REF',
      '2026-01-07T09:00:00.000Z',
    );
    insertInvoice.run(
      2001,
      2,
      'INV-2026-2001',
      24900,
      'due',
      'Intern referens: BOB-PRIVATE-REF',
      '2026-01-08T09:00:00.000Z',
    );

    const insertComment = database.prepare(
      'INSERT INTO comments (id, ticket_id, author_user_id, body, created_at) VALUES (?, ?, ?, ?, ?)',
    );
    insertComment.run(
      1,
      101,
      1,
      'Jag provar igen efter att ha startat om webbläsaren.',
      '2026-01-09T09:00:00.000Z',
    );
    insertComment.run(
      2,
      201,
      2,
      'Tack för hjälpen, jag skickar gärna fler uppgifter.',
      '2026-01-10T09:00:00.000Z',
    );
  });

  insert();
}

export function seed(): void {
  migrateDatabase();
  const database = openDatabase();
  try {
    seedDatabase(database);
  } finally {
    database.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed();
  console.log('SecureHub database seeded');
}
