import { Request, Response } from 'express';
import { BookingService } from '../services/BookingService';
import { StatusCodes } from 'http-status-codes';

class BookingController {

    private service: BookingService;

    constructor(service: BookingService) {
        this.service = service;
    }

    public async store(req: Request, res: Response) {
        const { spot_id } = req.params;
        const { user_id, date } = req.body;

        const result = await this.service.create({
            date,
            spot_id,
            user_id
        });

        if (req.connectedUsers) {
            const ownerSocket = req.connectedUsers[result.spot.user_id];

            if (ownerSocket) {
                req.io.to(ownerSocket).emit('booking_request', result);
            }
        }


        return res.status(StatusCodes.CREATED).json(result);
    }

}

export { BookingController };