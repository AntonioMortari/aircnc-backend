
export interface ISpot {
    id: string;
    company: string;
    price: number;
    techs: string[];
    thumbnail: string;
    user_id: string;
}

export interface ISpotsCreate {
    company: string;
    price: number;
    techs: string[];
    thumbnail: string;
    user_id: string;
}

export interface ISpotsRepository {
    create: ({ company, price, techs, thumbnail, user_id }: ISpotsCreate) => Promise<string>
    findAll: () => Promise<ISpot[]>
    findSpotsByUserId: (user_id: string) => Promise<ISpot[]> 
}