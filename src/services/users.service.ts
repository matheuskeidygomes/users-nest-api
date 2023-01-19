import { HttpException, Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UsersService {

    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>

    async getAll(): Promise<any []> {
        let users = await this.usersRepository.find();
        return users;
    }

    async getOne(id: number): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { id }, });
        return user;
    }

    async getOneByEmail(email: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { email }, });
        return user;
    }

    async register(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.save({ email, password });
        return user;
    }

    async update(id: number, body: object): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { id }, });
        if (!user) throw new HttpException("Usuário não encontrado", 404);
        else await this.usersRepository.update(id, body);
        return this.usersRepository.findOne({ where: { id }, });
    }

    async delete(id: number): Promise<any> {
        let res = await this.usersRepository.delete(id);
        return res;
    }

}
