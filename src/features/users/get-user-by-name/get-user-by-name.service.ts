import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/users/user.entity';
import { UserDto } from './get-user-dto';

@Injectable()
export class GetUserByNameService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(username: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userCleaned: UserDto = { id: user.id, username: user.username };
    return userCleaned;
  }
}
