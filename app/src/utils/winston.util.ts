import winston from 'winston';
import 'winston-daily-rotate-file';
const levels = {
  error: 0,
  warn: 1,
  http: 2,
  info: 3,
  console: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    level: 'http',
    filename: 'app-http-%DATE%.log',
    dirname: 'logs/http',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
  new winston.transports.DailyRotateFile({
    level: 'info',
    filename: 'app-info-%DATE%.log',
    dirname: 'logs/info',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
  new winston.transports.DailyRotateFile({
    level: 'error',
    filename: 'app-error-%DATE%.log',
    dirname: 'logs/error',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
];

const winLogger = winston.createLogger({
  levels,
  format,
  transports,
});

export default winLogger;
