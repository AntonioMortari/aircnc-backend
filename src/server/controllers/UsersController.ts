import { StatusCodes } from 'http-status-codes';
import { UsersService } from '../services/UsersService';
import { Request, Response } from 'express';

class UsersController {

    private service: UsersService;

    constructor(service: UsersService) {
        this.service = service;
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;

        const result = await this.service.findById(id);

        return res.status(StatusCodes.OK).json(result);
    }

    public async store(req: Request, res: Response) {
        const { email } = req.body;

        const result = await this.service.create({ email });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;

        await this.service.delete(id);

        return res.status(StatusCodes.NO_CONTENT).send();
    }

}

export { UsersController };