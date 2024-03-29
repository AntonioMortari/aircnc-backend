import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IBookingCreate, IBookingRepository } from '../interfaces/Booking';
import { ISpotsRepository } from '../interfaces/Spot';
import { IUsersRepository } from '../interfaces/User';
import { isValidObjectId } from 'mongoose';
import { isAfter } from 'date-fns';

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
        const formattedDate = new Date(date);

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

        if (!isAfter(formattedDate, new Date())) {
            throw new AppError('Não é possível reservar para uma data que já passou', StatusCodes.BAD_REQUEST);
        }

        const booking = await this.repository.create({
            date,
            user_id,
            spot_id
        });

        const bookingPopulate = { ...booking, user: findUser, spot: findSpot};

        return bookingPopulate;

    }

}

export { BookingService };