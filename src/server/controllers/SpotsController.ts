import { Request, Response } from 'express';
import { SpotsServices } from '../services/SpotsServices';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';

class SpotsController {

    private service: SpotsServices;

    constructor(service: SpotsServices) {
        this.service = service;
    }

    public async store(req: Request, res: Response) {
        if (!req.file) {
            throw new AppError('File is required', StatusCodes.BAD_REQUEST);
        }
        // const { user_id } = req;
        const { company, price, techs, user_id } = req.body;

        const result = await this.service.create({
            company,
            price,
            techs,
            thumbnail: req.file.filename,
            user_id
        });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async index(req: Request, res: Response) {
        const result = await this.service.findAll();

        return res.status(StatusCodes.OK).json(result);
    }

    public async showByUserId(req: Request, res: Response) {
        // const { user_id } = req.headers;
        const user_id: string = req.params.id;
        const result = await this.service.findSpotsByUserId(user_id);

        return res.status(StatusCodes.OK).json(result);
    }

}

export { SpotsController };