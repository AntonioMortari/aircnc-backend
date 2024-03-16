import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IBookingRepository } from '../interfaces/Booking';
import { IUsersRepository } from '../interfaces/User';
import { ISpotsRepository } from '../interfaces/Spot';

class RequestsService {

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

    public async approval(id: string) {

        if (!await this.repository.findById(id)) {
            throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
        }

        const booking = await this.repository.updateApproved(id, true);

        if (booking){
            const bookingPopulate = {...booking, user: await this.usersRepository.findById(booking.user_id), spot: await this.spotsRepository.findById(booking.spot_id)};

            return bookingPopulate;
        }
    }

    public async rejection(id: string) {

        if (!await this.repository.findById(id)) {
            throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
        }

        const booking = await this.repository.updateApproved(id, false);

        if (booking){
            const bookingPopulate = {...booking, user: await this.usersRepository.findById(booking.user_id), spot: await this.spotsRepository.findById(booking.spot_id)};

            return bookingPopulate;
        }
    }

}

export { RequestsService };