import express from 'express';
import path from 'node:path';
import { errorHandler, notFoundHandler } from './middleware/errors.js';
import { openDatabase } from './db/connection.js';
import { createSessionMiddleware } from './auth/session.js';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import debugRouter from './routes/debug.js';
import adminRouter from './routes/admin.js';
import invoicesRouter from './routes/invoices.js';
import profileRouter from './routes/profile.js';
import searchRouter from './routes/search.js';
import ticketsRouter from './routes/tickets.js';

const app = express();
const database = openDatabase();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(createSessionMiddleware());
app.use(authRouter(database));
app.use(dashboardRouter(database));
app.use(ticketsRouter(database));
app.use(invoicesRouter(database));
app.use(searchRouter(database));
app.use(profileRouter(database));
app.use(adminRouter(database));
app.use(debugRouter(database));

app.get('/', (_request, response) => {
  response.redirect('/dashboard');
});

app.get('/debug/error', () => {
  throw new Error('Deterministic internal error for local verification');
});

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
