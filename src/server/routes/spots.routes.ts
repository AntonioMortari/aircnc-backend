import { Request, Response, Router } from 'express';
import { MongoUsersRepository } from '../repositories/User/MongoUsersRepository';
import { MongoSpotsRepository } from '../repositories/Spot/MongoSpotsRepository';
import { SpotsServices } from '../services/SpotsServices';
import { SpotsController } from '../controllers/SpotsController';
import { upload } from '../middlewares/upload';
import { createSpotValidation } from '../validations/Spot';

const router: Router = Router();

// controller
const usersRepository = new MongoUsersRepository();
const spotsRepository = new MongoSpotsRepository();
const spotsService = new SpotsServices(spotsRepository, usersRepository);
const spotsController = new SpotsController(spotsService);

router.post('/', upload.single('thumbnail'), createSpotValidation, async (req: Request, res: Response) => {
    await spotsController.store(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    await spotsController.index(req, res);
});

router.get('/user/:id', async (req: Request, res: Response) => {
    await spotsController.showByUserId(req, res);
});

export { router as spotsRoutes };