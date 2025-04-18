import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/users/user.entity';
import { UserDto } from './dto/get-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Метод для получения пользователя по айди
  async findOneById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userCleaned: UserDto = { id: user.id, username: user.username };
    return userCleaned;
  }

  // Метод для обновления данных пользователя
  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Обновляем данные пользователя
    Object.assign(user, updateData);

    // Сохраняем обновленного пользователя в базе данных
    return this.usersRepository.save(user);
  }

  // Метод для удаления пользователя
  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Удаляем пользователя
    await this.usersRepository.remove(user);
  }

  // Метод для смены пароля
  async changePassword(
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

  // Метод для получения списка всех пользователей
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserByName(username: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userCleaned: UserDto = { id: user.id, username: user.username };
    return userCleaned;
  }
}
