
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    findAll: (query: any) => Promise<ISpot[]>
    findById: (id: string) => Promise<ISpot | null>
    findSpotsByUserId: (user_id: string) => Promise<ISpot[]> 
}