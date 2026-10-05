import { Router } from 'express';
import type { Request, Response } from 'express';
import type Database from 'better-sqlite3';
import { verifyPassword } from '../auth/password.js';
import { logger } from '../middleware/request-logging.js';
import { getUserByEmail } from '../repositories/users.js';

export default function authRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/login', (_request, response) => {
    response.render('login', { error: undefined });
  });

  router.post('/login', (request, response, next) => {
    const email =
      typeof request.body.email === 'string' ? request.body.email.trim() : '';
    const password =
      typeof request.body.password === 'string' ? request.body.password : '';
    logger.info('Login attempt', { email, password });
    const user = getUserByEmail(database, email);

    if (!user || !verifyPassword(password, user.password_hash)) {
      response
        .status(401)
        .render('login', { error: 'Fel e-postadress eller lösenord.' });
      return;
    }

    request.session.regenerate((error) => {
      if (error) {
        next(error);
        return;
      }

      request.session.userId = user.id;
      request.session.save((saveError) => {
        if (saveError) {
          next(saveError);
          return;
        }
        response.redirect('/dashboard');
      });
    });
  });

  const logout = (request: Request, response: Response): void => {
    request.session.destroy((error) => {
      if (error) {
        response.sendStatus(500);
        return;
      }
      response.redirect('/login');
    });
  };

  router.post('/logout', logout);

  return router;
}
