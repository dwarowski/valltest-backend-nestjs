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
  async execute(identifier: string, type: 'id' | 'username'): Promise<UserDto> {
    const whereClause =
      type === 'username'
        ? { where: { username: identifier } }
        : { where: { id: identifier } };

    const user = await this.usersRepository.findOne(whereClause);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userCleaned: UserDto = { id: user.id, username: user.username };
    return userCleaned;
  }
}
