import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Request } from 'express';
import { tokenPayload } from 'src/shared/utils/functions/extract-token/token-payload';
import { JwtService } from '@nestjs/jwt';
import { ReturnTokensDto } from 'src/shared/utils/dto/return-tokens/return-tokens.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(req: Request): Promise<ReturnTokensDto> {
    const refreshToken = await req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const userEntity = await this.userRepository.findOne({
      where: { refreshToken },
    });
    if (!userEntity) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!userEntity.refreshTokenExpirationDate) {
      throw new NotFoundException('No expiration date');
    }

    if (userEntity.refreshTokenExpirationDate < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    if (!userEntity.username) {
      userEntity.username = '';
    }
    const userPayload: tokenPayload = {
      id: userEntity.id,
      username: userEntity.username,
    };

    const newRefreshToken = crypto.randomBytes(64).toString('hex');
    const expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 дней
    await this.userRepository.update(userEntity.id, {
      refreshToken: newRefreshToken,
      refreshTokenExpirationDate: new Date(Date.now() + expirationTime),
    });

    const accessToken = await this.jwtService.signAsync(userPayload);
    return { access_token: accessToken, refresh_token: newRefreshToken };
  }
}
