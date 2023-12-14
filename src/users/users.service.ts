import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersModel)
        private readonly usersRepository: Repository<UsersModel>,
    ) {}

    async createUser(
        user: Pick<UsersModel, 'nickname' | 'email' | 'password'>,
    ) {
        // 1) nickname 중복이 없는 지 확인
        // exist() -> 만약에 조건에 해당되는 값이 있으면 true 반환
        const nicknameExists = await this.usersRepository.exist({
            where: {
                nickname: user.nickname,
            },
        });

        if (nicknameExists) {
            throw new BadRequestException('이미 존재하는 nickname 입니다.');
        }

        const emailExist = await this.usersRepository.exist({
            where: {
                email: user.email,
            },
        });

        if (emailExist) {
            throw new BadRequestException('이미 존재하는 email 입니다.');
        }

        const userObject = this.usersRepository.create({
            nickname: user.nickname,
            email: user.email,
            password: user.password,
        });

        const newUser = await this.usersRepository.save(userObject);

        return newUser;
    }

    async getAllUser() {
        return await this.usersRepository.find();
    }

    async getUserByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
}
