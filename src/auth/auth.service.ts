import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<Omit<User, 'hashed_password'>> {
    // Проверяем, что пользователь с таким email уже не существует
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

    // Создаем нового пользователя
    const user = this.userRepository.create({
      email: registerDto.email,
      hashed_password: hashedPassword,
    });

    // Сохраняем пользователя в базе данных
    const savedUser = await this.userRepository.save(user);

    // Убираем пароль из ответа
    const { hashed_password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto): Promise<Omit<User, 'hashed_password'>> {
    // Ищем пользователя по email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
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
    return userWithoutPassword;
  }
}
