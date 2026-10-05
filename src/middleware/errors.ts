import type { ErrorRequestHandler, RequestHandler } from 'express';
import { logger } from './request-logging.js';

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).render('error', {
    message: 'Sidan kunde inte hittas.',
    status: 404,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const message = error instanceof Error ? error.message : 'Okänt fel';
  const details =
    error instanceof Error ? `${message}\n${error.stack ?? ''}` : message;
  logger.error('Unhandled application error', { message });
  response.status(500).render('error', {
    message: details,
    status: 500,
  });
};
