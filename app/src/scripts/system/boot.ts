import path from 'path';
import fs from 'fs';
import { URL } from 'url';
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = new URL('.', import.meta.url).pathname;

const generateDir = async (): Promise<void> => {
  const logDir = path.join(__dirname, '../logs');
  const mainDir = path.join(__dirname, '../logs/main');
  const errorDir = path.join(__dirname, '../logs/error');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  if (!fs.existsSync(mainDir)) {
    fs.mkdirSync(mainDir);
  }
  if (!fs.existsSync(errorDir)) {
    fs.mkdirSync(errorDir);
  }
};

// generic handler for the configurations....
type Response =
  | {
      success: true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: object | undefined | null;
    }
  | {
      success: false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: object | undefined | null;
    };
const bootConfig = async (): Promise<Response> => {
  return await Promise.all(
    [generateDir].map((asyncFn) => {
      return new Promise((res, rej) => {
        asyncFn()
          .then((data) => res(data))
          .catch((e) => {
            rej(e);
          });
      });
    }),
  )
    .then(
      (data): Response => ({
        success: true,
        data: data,
      }),
    )
    .catch(
      (e): Response => ({
        success: false,
        error: e,
      }),
    );
};
export default bootConfig;
