import { IBooking, IBookingCreate, IBookingRepository } from '../../interfaces/Booking';
import { Booking } from '../../models/Booking';

class MongoBookingRepository implements IBookingRepository {

    public async create({ date, user_id, spot_id }: IBookingCreate): Promise<IBooking> {
        const result = await Booking.create({
            date,
            spot_id,
            user_id
        });

        return {
            id: result._id.toString(),
            approved: result.approved,
            date: result.date,
            spot_id: result.spot_id,
            user_id: result.spot_id
        };
    }

    public async findById(id: string): Promise<IBooking | null> {
        const booking = await Booking.findOne({ _id: id });

        if (!booking) {
            return null;
        }

        return {
            id: booking._id.toString(),
            approved: booking.approved,
            date: booking.date,
            spot_id: booking.spot_id,
            user_id: booking.user_id
        };
    }

    public async updateApproved(id: string, approved: boolean): Promise<IBooking | null> {

        const booking = await Booking.findOneAndUpdate(
            { _id: id },
            { $set: { approved: approved } }, 
            { new: true } 
        );

        if (booking) {
            return {
                id: booking._id.toString(),
                approved: booking.approved,
                date: booking.date,
                spot_id: booking.spot_id,
                user_id: booking.user_id
            };
        }

        return null;
    }


}

export { MongoBookingRepository };