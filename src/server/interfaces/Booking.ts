
export interface IBooking {
    id: string;
    date: Date;
    approved: boolean;
    user_id: string;
    spot_id: string;
}

export interface IBookingCreate {
    date: Date;
    user_id: string;
    spot_id: string;
}


export interface IBookingRepository {
    create: ({ date, spot_id, user_id }: IBookingCreate) => Promise<IBooking>;
    findById: (id: string) => Promise<IBooking | null>;
    updateApproved: (id: string, approved: boolean) => Promise<IBooking | null>
}