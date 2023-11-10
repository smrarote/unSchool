import morgan from 'morgan';
import winLogger from '../utils/winston.util.js';

const stream = {
  write: (message: string): unknown => winLogger.http(message),
};
const format = process.env.NODE_ENV === 'dev' ? 'tiny' : 'combined';
export default morgan(format, { stream });
