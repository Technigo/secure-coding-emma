import path from 'node:path';

const port = Number.parseInt(process.env.PORT ?? '3000', 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

export const config = {
  databasePath:
    process.env.DATABASE_PATH ??
    path.join(process.cwd(), 'data', 'securehub.sqlite'),
  demoIntegrationKey:
    process.env.DEMO_INTEGRATION_KEY ?? 'DEMO-INTEGRATION-KEY-LOCAL-ONLY',
  host: process.env.HOST ?? '127.0.0.1',
  appEnvironment: process.env.APP_ENV ?? 'development',
  port,
  sessionSecret:
    process.env.SESSION_SECRET ?? 'securehub-local-development-only',
};
