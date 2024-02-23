import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { ISpotsCreate, ISpotsRepository } from '../interfaces/Spot';
import { IUsersRepository } from '../interfaces/User';
import { isValidObjectId } from 'mongoose';


class SpotsServices {

    private repository: ISpotsRepository;
    private usersRepository: IUsersRepository;

    constructor(repository: ISpotsRepository, usersRepository: IUsersRepository) {
        this.repository = repository;
        this.usersRepository = usersRepository;
    }

    public async create({ company, price, techs, thumbnail, user_id }: ISpotsCreate) {

        const findUser = await this.usersRepository.findById(user_id);
        if (!findUser) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        const result = await this.repository.create({
            company,
            price,
            techs,
            thumbnail,
            user_id
        });

        return result;
    }

    public async findAll() {
        return await this.repository.findAll();
    }

    public async findSpotsByUserId(user_id: string) {
        if (!isValidObjectId(user_id)) {
            throw new AppError('ObjectId is required', StatusCodes.BAD_REQUEST);
        }

        const findUser = await this.usersRepository.findById(user_id);
        if (!findUser) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        return await this.repository.findSpotsByUserId(user_id);
    }

}

export { SpotsServices };