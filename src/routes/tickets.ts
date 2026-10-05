import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';
import {
  createComment,
  listCommentsForTicket,
} from '../repositories/comments.js';
import { getTicketById } from '../repositories/tickets.js';

export default function ticketsRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/tickets/:id', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const ticketId = request.params.id;
    if (typeof ticketId !== 'string' || !/^\d+$/.test(ticketId)) {
      response.sendStatus(404);
      return;
    }

    const ticket = getTicketById(database, Number(ticketId));
    if (!ticket) {
      response.sendStatus(404);
      return;
    }

    const canView =
      request.user.role === 'support' ||
      request.user.role === 'admin' ||
      ticket.owner_user_id === request.user.id;
    if (!canView) {
      response.sendStatus(403);
      return;
    }

    const comments = listCommentsForTicket(database, ticket.id);
    response.render('ticket', { comments, ticket, user: request.user });
  });

  router.post(
    '/tickets/:id/comments',
    requireAuth(database),
    (request, response) => {
      if (!request.user) {
        response.redirect('/login');
        return;
      }

      const ticketId = request.params.id;
      if (typeof ticketId !== 'string' || !/^\d+$/.test(ticketId)) {
        response.sendStatus(404);
        return;
      }

      const ticket = getTicketById(database, Number(ticketId));
      if (!ticket) {
        response.sendStatus(404);
        return;
      }

      const canComment =
        request.user.role === 'support' ||
        request.user.role === 'admin' ||
        ticket.owner_user_id === request.user.id;
      if (!canComment) {
        response.sendStatus(403);
        return;
      }

      const body =
        typeof request.body.body === 'string' ? request.body.body.trim() : '';
      if (!body) {
        response.status(400).send('Kommentaren får inte vara tom.');
        return;
      }

      createComment(
        database,
        ticket.id,
        request.user.id,
        body,
        new Date().toISOString(),
      );
      response.redirect(`/tickets/${ticket.id}`);
    },
  );

  return router;
}
