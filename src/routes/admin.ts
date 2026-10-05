import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';
import { listUsers } from '../repositories/users.js';

export default function adminRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/admin/users', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    if (request.user.role !== 'admin') {
      response.sendStatus(403);
      return;
    }

    response.render('admin-users', {
      users: listUsers(database),
      user: request.user,
    });
  });

  return router;
}
