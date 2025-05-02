import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { tokenPayload } from 'src/shared/utils/functions/extract-token/token-payload';

import { User } from 'src/entities/users/user.entity';

import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string; refresh_token: string }> {
    // Ищем пользователя по email
    const userEntity = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!userEntity) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    // Сравниваем пароль
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      userEntity.hashed_password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const refreshToken = crypto.randomBytes(64).toString('hex');
    const expirationTime = 30 * 24 * 60 * 60 * 1000;
    await this.userRepository.update(userEntity.id, {
      refreshToken,
      refreshTokenExpirationDate: new Date(Date.now() + expirationTime)
    });

    const userPayload: tokenPayload = {
      id: userEntity.id,
      username: userEntity.username,
    };

    const accessToken = await this.jwtService.signAsync(userPayload)
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
