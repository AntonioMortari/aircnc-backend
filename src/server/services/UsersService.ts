import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IUserCreate, IUsersRepository } from '../interfaces/User';

class UsersService {

    private repository: IUsersRepository;

    constructor(repository: IUsersRepository) {
        this.repository = repository;
    }

    public async findById(id: string) {
        const result = await this.repository.findById(id);

        if (!result) {
            throw new AppError('User not found', 404);
        }

        return result;
    }

    public async create({ email }: IUserCreate) {

        const findUser = await this.repository.findByEmail(email);
        if (findUser) {
            throw new AppError(`Email ${email} already registered`, StatusCodes.BAD_REQUEST);
        }

        const result = await this.repository.create({ email });

        return result;
    }

    public async delete(id: string){
        const findUser = await this.repository.findById(id);
        if (!findUser) {
            throw new AppError('User not found', 404);
        }

        await this.repository.delete(id);
    }

}

export { UsersService };