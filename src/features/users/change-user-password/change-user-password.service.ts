import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { ChangePasswordDto } from './change-password.dto';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class ChangeUserPasswordService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Метод для смены пароля
  async execute(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Проверяем, совпадает ли старый пароль
    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.hashed_password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    // Хешируем новый пароль
    const newHashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );

    // Обновляем пароль
    user.hashed_password = newHashedPassword;
    await this.usersRepository.save(user);
  }
}
