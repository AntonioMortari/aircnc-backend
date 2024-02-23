import express from 'express';

import 'dotenv/config';
import './database/mongodb';
import { errorMiddleware } from './middlewares/error';


const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use(errorMiddleware);
export { server };