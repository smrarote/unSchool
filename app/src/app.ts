import express from 'express';
import cors from 'cors';
import helment from 'helmet';
import logger from './middlewares/logger.middlewares.js';
// server configurations
const app = express();

// setup middlewares
app.use(logger);
app.use(helment());
app.use(express.json());
app.use(cors({}));
export default app;
