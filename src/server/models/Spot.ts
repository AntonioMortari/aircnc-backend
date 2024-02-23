import { Schema, model } from 'mongoose';
import { ISpot } from '../interfaces/Spot';

const spotSchema = new Schema<ISpot>({
    company: { type: String, required: true },
    price: { type: Number, required: true },
    techs: [String],
    thumbnail: String,
    user_id: {
        type: String,
        ref: 'User'
    }
});

const Spot = model<ISpot>('Spot', spotSchema);

export { Spot };