import { IUser, IUserCreate, IUsersRepository } from '../../interfaces/User';
import { User } from '../../models/User';

class MongoUsersRepository implements IUsersRepository {

    public async findById(id: string): Promise<IUser | null> {
        const result = await User.findOne({_id: id});

        if(!result) return null;

        return{
            id: result._id.toString(),
            email: result.email
        };
    }

    public async findByEmail(email: string): Promise<IUser | null>{
        const result = await User.findOne({email});

        console.debug(result);

        if(!result) return null;

        return {
            id: result._id.toString(),
            email: result.email
        };
    }

    public async create({email}: IUserCreate): Promise<string>{
        const result = await User.create({
            email
        });

        return result._id.toString();
    }

    public async delete(id: string): Promise<void>{
        await User.deleteOne({_id:id});
    }
}

export { MongoUsersRepository };