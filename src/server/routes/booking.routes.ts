import { Request, Response, Router } from 'express';
import { MongoBookingRepository } from '../repositories/Booking/MongoBookingRepository';
import { MongoSpotsRepository } from '../repositories/Spot/MongoSpotsRepository';
import { MongoUsersRepository } from '../repositories/User/MongoUsersRepository';
import { BookingService } from '../services/BookingService';
import { BookingController } from '../controllers/BookingController';

const router: Router = Router();

// controller
const usersRepository = new MongoUsersRepository();
const spotsRepository = new MongoSpotsRepository();
const bookingRepository = new MongoBookingRepository();
const bookingService = new BookingService(bookingRepository, usersRepository,spotsRepository);
const bookingController = new BookingController(bookingService);

router.post('/spots/:spot_id/bookings', async (req: Request, res: Response) => {
    await bookingController.store(req, res);
});

export { router as bookingRoutes };