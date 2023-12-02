import winLogger from './utils/winston.util.js';
import bootConfig from './utils/boot.util.js';
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
// boot process
void (async (): Promise<void> => {
  const response = await bootConfig();
  if (response.success) {
    winLogger.info('Server : Boot : Success');
  } else {
    winLogger.info(`Server : Boot : failed : ${response.error}`);
  }
})();

// handle
app.listen(process.env.PORT ?? 2000, () => {
  winLogger.info(` Server : Running : ${process.env.PORT || 3000}`);
});
