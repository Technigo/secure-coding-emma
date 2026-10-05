import { Router } from 'express';
import type Database from 'better-sqlite3';
import { requireAuth } from '../auth/middleware.js';

export default function debugRouter(database: Database.Database): Router {
  const router = Router();

  router.get('/debug/config', requireAuth(database), (request, response) => {
    if (!request.user) {
      response.redirect('/login');
      return;
    }

    const trainingConfig = {
      appEnvironment: 'development',
      databasePath: './data/securehub.sqlite',
      demoIntegrationKey: 'DEMO-INTEGRATION-KEY-LOCAL-ONLY',
      sessionSecret: 'securehub-local-development-only',
    };
    response.render('debug', { config: trainingConfig, user: request.user });
  });

  return router;
}
