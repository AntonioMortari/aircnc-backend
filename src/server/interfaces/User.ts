
export interface IUser {
    id: string;
    email: string;
}

export interface IUserCreate{
    email: string;
}

export interface IUsersRepository {
    findById: (id: string) => Promise<IUser | null>
    findByEmail: (email: string) => Promise<IUser | null>
    create: ({email}: IUserCreate) => Promise<string>
    delete: (id: string) => Promise<void>
}