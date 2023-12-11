import winLogger from './utils/winston.util.js';
import boot from './scripts/system/boot.js';
import shutDown from './scripts/system/shutdown.js';
import { Server } from 'http';
import { URL } from 'url';
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = new URL('.', import.meta.url).pathname;
import path from 'path';
// load environment variables
import dotenv from 'dotenv-safe';
const envFile = path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: envFile,
  example: path.resolve(__dirname, '../.env.example'),
  allowEmptyValues: true,
});

import app from './app.js';
let server: Server | null = null;
// boot process
void (async (): Promise<void> => {
  const response = await boot();
  if (response.success) {
    winLogger.info('Server : Boot : Success');
  } else {
    winLogger.info(`Server : Boot : failed : ${response.error}`);
  }
  server = app.listen(process.env.PORT ?? 3000, () => {
    winLogger.info(` Server : Running : ${process.env.PORT || 3000}`);
  });
})();

const shutDownProcedure = async (): Promise<void> => {
  if (server) server.close();
  await shutDown();
  process.exit(0);
};

process.on('SIGTERM', shutDownProcedure);
process.on('SIGINT', shutDownProcedure);
