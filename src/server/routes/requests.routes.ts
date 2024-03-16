import { Request, Response, Router } from 'express';
import { MongoBookingRepository } from '../repositories/Booking/MongoBookingRepository';
import { MongoUsersRepository } from '../repositories/User/MongoUsersRepository';
import { MongoSpotsRepository } from '../repositories/Spot/MongoSpotsRepository';
import { RequestsService } from '../services/RequestsService';
import { RequestsController } from '../controllers/RequestsController';

const router: Router = Router();

// controller
const mongoBookingRepository = new MongoBookingRepository();
const mongoUsersRepository = new MongoUsersRepository();
const mongoSpotsRepository = new MongoSpotsRepository();
const requestsService = new RequestsService(mongoBookingRepository, mongoUsersRepository, mongoSpotsRepository);
const requestController = new RequestsController(requestsService);

router.post('/bookings/:id/approvals', async (req: Request, res: Response) => {
    await requestController.approval(req, res);
});

router.post('/bookings/:id/rejections', async (req: Request, res: Response) => {
    await requestController.rejection(req, res);
});

export { router as requestsRoutes };