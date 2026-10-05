import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';
import {
  searchTickets,
  searchTicketsForUser,
} from '../repositories/tickets.js';

export default function searchRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/search', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const query = typeof request.query.q === 'string' ? request.query.q : '';
    const tickets =
      request.user.role === 'user'
        ? searchTicketsForUser(database, request.user.id, query)
        : searchTickets(database, query);
    response.render('search', { query, tickets, user: request.user });
  });

  return router;
}
