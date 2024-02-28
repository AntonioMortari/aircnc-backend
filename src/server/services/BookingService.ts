import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IBookingCreate, IBookingRepository } from '../interfaces/Booking';
import { ISpotsRepository } from '../interfaces/Spot';
import { IUsersRepository } from '../interfaces/User';
import { isValidObjectId } from 'mongoose';

class BookingService {

    private repository: IBookingRepository;
    private usersRepository: IUsersRepository;
    private spotsRepository: ISpotsRepository;

    constructor(
        repository: IBookingRepository,
        usersRepository: IUsersRepository,
        spotsRepository: ISpotsRepository
    ) {
        this.repository = repository;
        this.usersRepository = usersRepository;
        this.spotsRepository = spotsRepository;
    }

    public async create({ date, user_id, spot_id }: IBookingCreate) {

        if (!isValidObjectId(user_id) || !isValidObjectId(spot_id)) {
            throw new AppError('ObjectId is required', StatusCodes.BAD_REQUEST);
        }

        // verify user_id
        const findUser = await this.usersRepository.findById(user_id);
        if (!findUser) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        // verify spot_id
        const findSpot = await this.spotsRepository.findById(spot_id);
        if (!findSpot) {
            throw new AppError('Spot not found', StatusCodes.NOT_FOUND);
        }

        return await this.repository.create({
            date,
            user_id,
            spot_id
        });

    }

}

export { BookingService };