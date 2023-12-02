import express from 'express';
import cors from 'cors';
import helment from 'helmet';
import logger from './middlewares/logger.middlewares.js';
import errorHandler from './middlewares/error.middlewares.js';
import routeMap from './v1/routes.map.js';
// server configurations
const app = express();

// setup middlewares
app.use(logger);
app.use(helment());
app.use(express.json());
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use('/api/v1', routeMap);
app.use('/health', (_: express.Request, res: express.Response) => {
  res.status(200).json({
    code: 200,
    message: 'Server Running',
  });
});
app.use('*', (_: express.Request, res: express.Response, next: express.NextFunction) => {
  next(new Error('Invaid Request'));
});
app.use(errorHandler);

export default app;
