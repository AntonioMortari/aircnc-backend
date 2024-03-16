/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import {Request as ExpressRequest} from 'express';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

declare module 'express' {
    export interface Request extends ExpressRequest {
        user_id?: string;
        io?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
        connectedUsers?: Record<string, string>;
    }
}