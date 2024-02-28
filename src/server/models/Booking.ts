import { Schema, model } from 'mongoose';
import { IBooking } from '../interfaces/Booking';

const bookingSchema = new Schema<IBooking>({
    approved: {type: Boolean, default: false},
    date: { type: Date, default: new Date() },
    user_id: {
        ref: 'User',
        type: String
    },
    spot_id: {
        ref: 'Spot',
        type: String
    }
});

const Booking = model<IBooking>('Booking', bookingSchema);

export { Booking };