import type { RequestHandler } from 'express';
import session from 'express-session';
import { config } from '../config.js';

export function createSessionMiddleware(): RequestHandler {
  return session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  });
}
