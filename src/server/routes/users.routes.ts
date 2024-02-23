import { Request, Response, Router } from 'express';
import {MongoUsersRepository} from '../repositories/User/MongoUsersRepository';
import {UsersService} from '../services/UsersService';
import {UsersController} from '../controllers/UsersController';

const router: Router = Router();

// controller
const usersRepository = new MongoUsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.get('/:id', async(req: Request, res: Response) => {
    await usersController.show(req,res);
});

router.post('/', async(req: Request, res: Response) => {
    await usersController.store(req,res);
});

router.delete('/:id', async(req: Request, res: Response) => {
    await usersController.destroy(req,res);
});

export { router as usersRoutes };