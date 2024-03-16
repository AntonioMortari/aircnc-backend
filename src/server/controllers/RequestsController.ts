import { Request, Response } from 'express';
import { RequestsService } from '../services/RequestsService';
import { StatusCodes } from 'http-status-codes';

class RequestsController {

    private service: RequestsService;

    constructor(service: RequestsService) {
        this.service = service;
    }

    public async approval(req: Request, res: Response) {
        const { id } = req.params;

        const result = await this.service.approval(id);

        if (result && req.connectedUsers) {
            const bookingUserSocket = req.connectedUsers[result.user_id];

            req.io.to(bookingUserSocket).emit('booking_response', result);
        }

        return res.status(StatusCodes.OK).json(result);
    }

    public async rejection(req: Request, res: Response) {
        const { id } = req.params;

        const result = await this.service.rejection(id);

        if (result && req.connectedUsers) {
            const bookingUserSocket = req.connectedUsers[result.user_id];

            req.io.to(bookingUserSocket).emit('booking_response', result);
        }

        return res.status(StatusCodes.OK).json(result);
    }

}

export { RequestsController };