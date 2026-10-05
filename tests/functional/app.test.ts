import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import type { LogEntry } from '../../src/middleware/request-logging.js';

process.env.DATABASE_PATH = path.join(
  process.cwd(),
  'temp',
  'functional.sqlite',
);

const { resetDatabase } = await import('../../src/db/reset.js');
resetDatabase();
const { default: app } = await import('../../src/app.js');
const { createLogger, setLoggerForTests } =
  await import('../../src/middleware/request-logging.js');

const credentials = {
  admin: { email: 'admin@example.test', password: 'SecureHub!Admin1' },
  alice: { email: 'alice@example.test', password: 'SecureHub!Alice1' },
  bob: { email: 'bob@example.test', password: 'SecureHub!Bob1' },
  support: {
    email: 'sara.support@example.test',
    password: 'SecureHub!Sara1',
  },
};

async function loggedIn(user: keyof typeof credentials) {
  const agent = request.agent(app);
  await agent.post('/login').type('form').send(credentials[user]).expect(302);
  return agent;
}

describe('SecureHub functional baseline', () => {
  // Keep application log output out of the test results.
  const logEntries: LogEntry[] = [];
  let restoreLogger: () => void;

  beforeAll(() => {
    restoreLogger = setLoggerForTests(
      createLogger((entry) => logEntries.push(entry)),
    );
  });

  afterAll(() => {
    restoreLogger();
    logEntries.length = 0;
  });

  it('returns the health response', async () => {
    await request(app).get('/health').expect(200, { status: 'ok' });
  });

  it('logs in with each seed account and rejects a bad password', async () => {
    for (const user of Object.keys(credentials) as Array<
      keyof typeof credentials
    >) {
      await request(app)
        .post('/login')
        .type('form')
        .send(credentials[user])
        .expect(302);
    }
    await request(app)
      .post('/login')
      .type('form')
      .send({ email: credentials.alice.email, password: 'fel lösenord' })
      .expect(401);
  });

  it('redirects the root path to the dashboard', async () => {
    await request(app).get('/').expect(302).expect('Location', '/dashboard');
    await request(app)
      .get('/dashboard')
      .expect(302)
      .expect('Location', '/login');

    const alice = await loggedIn('alice');
    await alice.get('/').expect(302).expect('Location', '/dashboard');
    await alice.get('/dashboard').expect(200);
  });

  it('protects the dashboard and invalidates logout', async () => {
    await request(app)
      .get('/dashboard')
      .expect(302)
      .expect('Location', '/login');
    const agent = await loggedIn('alice');
    await agent.get('/dashboard').expect(200);
    await agent.post('/logout').expect(302).expect('Location', '/login');
    await agent.get('/dashboard').expect(302).expect('Location', '/login');
  });

  it('shows role-aware dashboard data', async () => {
    const alice = await loggedIn('alice');
    const alicePage = await alice.get('/dashboard').expect(200);
    expect(alicePage.text).toContain('Kan inte ladda ner faktura');
    expect(alicePage.text).not.toContain('Dubbeldebitering');
    expect(alicePage.text).toContain('INV-2026-1001');
    expect(alicePage.text).not.toContain('INV-2026-2001');

    const support = await loggedIn('support');
    const supportPage = await support.get('/dashboard').expect(200);
    expect(supportPage.text).toContain('Dubbeldebitering');

    const admin = await loggedIn('admin');
    const adminPage = await admin.get('/dashboard').expect(200);
    expect(adminPage.text).toContain('/admin/users');
  });

  it('enforces ticket authorization and supports comments', async () => {
    const alice = await loggedIn('alice');
    await alice.get('/tickets/101').expect(200);
    await alice.get('/tickets/201').expect(403);
    await alice
      .post('/tickets/101/comments')
      .type('form')
      .send({ body: 'En vanlig kommentar' })
      .expect(302);
    const ticket = await alice.get('/tickets/101').expect(200);
    expect(ticket.text).toContain('En vanlig kommentar');
  });

  it('shows scoped invoices and supports admin access', async () => {
    const alice = await loggedIn('alice');
    const list = await alice.get('/invoices').expect(200);
    expect(list.text).toContain('INV-2026-1001');
    expect(list.text).not.toContain('INV-2026-2001');
    await alice.get('/invoices/1001').expect(200);

    const admin = await loggedIn('admin');
    await admin.get('/invoices/2001').expect(200);
  });

  it('searches tickets and updates the display name', async () => {
    const alice = await loggedIn('alice');
    const search = await alice.get('/search?q=kontakt').expect(200);
    expect(search.text).toContain('Ändra kontaktuppgifter');
    await alice
      .post('/profile')
      .type('form')
      .send({ display_name: 'Alice Test' })
      .expect(302);
    const profile = await alice.get('/profile').expect(200);
    expect(profile.text).toContain('Alice Test');
  });

  it('restricts admin users', async () => {
    const alice = await loggedIn('alice');
    await alice.get('/admin/users').expect(403);
    const admin = await loggedIn('admin');
    await admin.get('/admin/users').expect(200);
  });
});
