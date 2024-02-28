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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findAll(query?: any): Promise<ISpot[]> {
        let filter = {};
        if (query && query.tech) {
            filter = { techs: { $in: [query.tech] } };
        }
        const result = await Spot.find(filter);

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

    public async findById(id: string): Promise<ISpot | null> {
        const result = await Spot.findOne({ _id: id });

        if (!result) return null;

        return {
            id: result._id.toString(),
            company: result.company,
            techs: result.techs,
            price: result.price,
            thumbnail: result.thumbnail,
            user_id: result.user_id

        };
    }

    public async findSpotsByUserId(user_id: string): Promise<ISpot[]> {
        const result = await Spot.find({ user_id: user_id });

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


}

export { MongoSpotsRepository };