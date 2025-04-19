import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/entities/users/user.entity';

import { LoginDto } from '../login/login.dto';
import { RegisterDto } from './register.dto';
import { LoginService } from '../login/login.service';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    // Проверяем, что пользователь с таким email еще не существует
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Сохраняем пользователя в базе данных
    await this.userRepository.save({
      email: registerDto.email,
      hashed_password: hashedPassword,
    });

    const loginDto: LoginDto = {
      email: registerDto.email,
      password: registerDto.password,
    };

    return await this.loginService.login(loginDto);
  }
}
