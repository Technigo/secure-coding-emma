import app from './app.js';
import { config } from './config.js';

app.listen(config.port, config.host, () => {
  console.log(`SecureHub listening at http://${config.host}:${config.port}`);
});
