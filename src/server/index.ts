import express from 'express';

import 'dotenv/config';
import './database/mongodb';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export { server };