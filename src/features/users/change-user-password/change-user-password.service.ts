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
    private readonly usersRepository: Repository<User>,
  ) {}

  // Метод для смены пароля
  async execute(changePasswordDto: ChangePasswordDto): Promise<string> {
    const { email, newPassword, oldPassword } = changePasswordDto;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    // Проверяем, совпадает ли старый пароль
    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      user.hashed_password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    // Хешируем новый пароль
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль
    user.hashed_password = newHashedPassword;
    await this.usersRepository.save(user);
    return 'Password changed successfully';
  }
}
