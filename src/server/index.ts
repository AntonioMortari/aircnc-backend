import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';

import { errorMiddleware } from './middlewares/error';
import { usersRoutes } from './routes/users.routes';
import { spotsRoutes } from './routes/spots.routes';
import { bookingRoutes } from './routes/booking.routes';
import { errors } from 'celebrate';
import { Server } from 'socket.io';

import 'dotenv/config';
import './database/mongodb';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*'
    }
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'public', 'uploads')));

// routes
app.use('/users', usersRoutes);
app.use('/spots', spotsRoutes);
app.use('/',  bookingRoutes);

// error middlewares
app.use(errors());
app.use(errorMiddleware);

export { server, io };
import './websocket';