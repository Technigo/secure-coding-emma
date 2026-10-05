import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';
import {
  getInvoiceById,
  listInvoicesForUser,
} from '../repositories/invoices.js';

export default function invoicesRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/invoices', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const invoices = listInvoicesForUser(database, request.user.id);
    response.render('invoices', { invoices, user: request.user });
  });

  router.get('/invoices/:id', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const invoiceId = request.params.id;
    if (typeof invoiceId !== 'string' || !/^\d+$/.test(invoiceId)) {
      response.sendStatus(404);
      return;
    }

    const invoice = getInvoiceById(database, Number(invoiceId));
    if (!invoice) {
      response.sendStatus(404);
      return;
    }

    response.render('invoice', { invoice, user: request.user });
  });

  return router;
}
