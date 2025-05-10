import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/users/user.entity';
import { UserDto } from './get-user-dto';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Метод для получения пользователя по айди
  async execute(identifier: string, type: 'id'): Promise<User>;
  async execute(identifier: string, type: 'username'): Promise<UserDto>;
  async execute(identifier: string, type: 'id' | 'username') {
    const whereClause =
      type === 'username'
        ? { where: { username: identifier } }
        : { where: { id: identifier } };

    const userEntity = await this.usersRepository.findOne(whereClause);
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    if (type === 'username') {
      const user: UserDto = {
        username: userEntity.username,
        avatar_location: userEntity.avatar_location,
      };

      return user;
    } else {
      return userEntity;
    }
  }
}
