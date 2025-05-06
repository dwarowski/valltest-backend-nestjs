import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { User } from 'src/entities/users/user.entity';
import { extractToken } from 'src/shared/utils/functions/extract-token/token-extract';
import { Repository } from 'typeorm';

@Injectable()
export class LogoutService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(req: Request, res: Response) {
    const payload = await extractToken(req);
    const userId = payload.id;
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userEntity) {
      throw new NotFoundException('No user found');
    }

    await this.userRepository.update(userEntity.id, {
      refreshToken: null,
      refreshTokenExpirationDate: null,
    });

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return { message: 'logout succsesful' }
  }
}
