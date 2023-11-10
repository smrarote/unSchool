import path from 'path';
import fs from 'fs';
import { error } from 'console';
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
type success = {
  success: boolean;
  data: unknown;
};
type error = {
  success: boolean;
  error: unknown;
};
const bootConfig = async (): Promise<success | error> => {
  return await Promise.all(
    [generateDir].map((asyncFn) => {
      return new Promise((res, rej) => {
        asyncFn()
          .then((data) => res(data))
          .catch((e) => rej(e));
      });
    }),
  )
    .then((data) => ({
      success: true,
      data: data,
    }))
    .catch((e) => ({
      success: false,
      error: e,
    }));
};

export default bootConfig;
