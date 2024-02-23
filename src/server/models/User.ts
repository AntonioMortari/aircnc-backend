import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema<IUser>({
    email: { type: String, required: true }
});

const User = model<IUser>('User', userSchema);

export { User };