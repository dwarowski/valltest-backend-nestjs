import { Injectable, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/entities/user.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Подтверждение email',
      text: `Для подтверждения email перейдите по ссылке: http://yourapp.com/verify-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    this.logger.log(`Регистрация пользователя: ${registerDto.email}`);

    try {
      // Проверяем, что пользователь с таким email уже не существует
      const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
      if (existingUser) {
        throw new ConflictException('Пользователь с таким email уже зарегистрирован');
      }

      // Проверяем, что пароль и подтверждение пароля совпадают
      if (registerDto.password !== registerDto.confirmPassword) {
        throw new ConflictException('Пароль и подтверждение пароля не совпадают');
      }

      // Хешируем пароль
      const hashedPassword = await this.hashPassword(registerDto.password);

      // Генерируем токен для подтверждения email
      const emailVerificationToken = Math.random().toString(36).substring(2);

      // Создаем нового пользователя
      const user = this.userRepository.create({
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        role: UserRole.USER,
        emailVerificationToken,
      });

      // Сохраняем пользователя в базе данных
      const savedUser = await this.userRepository.save(user);

      // Отправляем письмо с подтверждением email
      await this.sendVerificationEmail(savedUser.email, emailVerificationToken);

      // Убираем пароль из ответа
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      this.logger.error(`Ошибка при регистрации: ${error.message}`);
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { emailVerificationToken: token } });
    if (!user) {
      throw new NotFoundException('Неверный токен подтверждения');
    }

    user.emailVerificationToken = null; // Убираем токен
    await this.userRepository.save(user);
  }
}