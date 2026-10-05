import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';
import { listInvoicesForUser } from '../repositories/invoices.js';
import { listAllTickets, listTicketsForUser } from '../repositories/tickets.js';

export default function dashboardRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/dashboard', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const tickets =
      request.user.role === 'user'
        ? listTicketsForUser(database, request.user.id)
        : listAllTickets(database);
    const invoices = listInvoicesForUser(database, request.user.id);
    response.render('dashboard', { invoices, tickets, user: request.user });
  });

  return router;
}
