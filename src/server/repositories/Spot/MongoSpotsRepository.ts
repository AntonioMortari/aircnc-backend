import { ISpot, ISpotsCreate, ISpotsRepository } from '../../interfaces/Spot';
import { Spot } from '../../models/Spot';

class MongoSpotsRepository implements ISpotsRepository {

    public async create({ company, price, techs, thumbnail, user_id }: ISpotsCreate): Promise<string> {
        const result = await Spot.create({
            company,
            price,
            techs,
            thumbnail,
            user_id
        });

        return result._id.toString();
    }

    public async findAll(): Promise<ISpot[]> {
        const result = await Spot.find();

        const spots: ISpot[] = result.map(spot => {
            return {
                id: spot._id.toString(),
                company: spot.company,
                price: spot.price,
                techs: spot.techs,
                thumbnail: spot.thumbnail,
                user_id: spot.user_id
            };
        });

        return spots;
    }

    public async findSpotsByUserId(user_id: string): Promise<ISpot[]>{
        const result = await Spot.find({user_id: user_id});

        const spots: ISpot[] = result.map(spot => {
            return{
                id: spot._id.toString(),
                company: spot.company,
                price: spot.price,
                techs: spot.techs,
                thumbnail: spot.thumbnail,
                user_id: spot.user_id
            };
        });

        return spots;
    }


}

export { MongoSpotsRepository };