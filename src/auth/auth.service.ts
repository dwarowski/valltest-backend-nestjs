import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
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

    return this.login(loginDto);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    // Ищем пользователя по email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['role', 'role.role'],
    });
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    // Сравниваем пароль
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.hashed_password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    // Убираем пароль из ответа
    const { hashed_password, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(userWithoutPassword, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    };
  }
}
