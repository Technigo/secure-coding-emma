import type { NextFunction, Request, Response } from 'express';
import type Database from 'better-sqlite3';
import { getUserById } from '../repositories/users.js';

export function requireAuth(database: Database.Database) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const userId = request.session.userId;
    if (!userId) {
      response.redirect('/login');
      return;
    }

    const user = getUserById(database, userId);
    if (!user) {
      request.session.destroy(() => {
        response.redirect('/login');
      });
      return;
    }

    request.user = user;
    next();
  };
}
