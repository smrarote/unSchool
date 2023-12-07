import path from 'path';
import fs from 'fs';
import { URL } from 'url';
import DataBase from '../../config/db/index.js';
const db = DataBase.db();

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
      data: object | string | undefined | null;
    }
  | {
      success: false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: object | undefined | null;
    };
const boot = async (): Promise<Response> => {
  try {
    await generateDir();
    await db.connect();
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
  return {
    success: true,
    data: 'Server Booted',
  };
};
export default boot;
