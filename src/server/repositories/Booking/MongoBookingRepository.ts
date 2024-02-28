import { IBookingCreate, IBookingRepository } from '../../interfaces/Booking';
import { Booking } from '../../models/Booking';

class MongoBookingRepository implements IBookingRepository {

    public async create({ date, user_id, spot_id }: IBookingCreate): Promise<string> {
        const result = await Booking.create({
            date,
            spot_id,
            user_id
        });

        return result._id.toString();
    }

}

export { MongoBookingRepository };