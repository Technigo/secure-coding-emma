import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';
import { updateUserProfile } from '../repositories/users.js';

export default function profileRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/profile', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    response.render('profile', { error: undefined, user: request.user });
  });

  router.post('/profile', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const displayName =
      typeof request.body.display_name === 'string'
        ? request.body.display_name.trim()
        : '';
    if (!displayName) {
      response.status(400).render('profile', {
        error: 'Visningsnamnet får inte vara tomt.',
        user: request.user,
      });
      return;
    }

    const role =
      typeof request.body.role === 'string'
        ? request.body.role
        : request.user.role;
    updateUserProfile(database, request.user.id, displayName, role);
    response.redirect('/profile');
  });

  return router;
}
