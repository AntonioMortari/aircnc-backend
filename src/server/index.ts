import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error';
import { usersRoutes } from './routes/users.routes';
import { spotsRoutes } from './routes/spots.routes';

import 'dotenv/config';
import './database/mongodb';
import { errors } from 'celebrate';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/users', usersRoutes);
server.use('/spots', spotsRoutes);

server.use(errors());
server.use(errorMiddleware);
export { server };