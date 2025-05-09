import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ReturnTokensDto } from '../../dto/return-tokens/return-tokens.dto';

export function addTokenToCookie(tokensDto: ReturnTokensDto, res: Response) {
  const { access_token, refresh_token } = tokensDto;

  if (!access_token) {
    throw new UnauthorizedException();
  }

  res.cookie('access_token', access_token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 6000,
  });

  res.cookie('refresh_token', refresh_token, {
    // Добавлено refresh_token cookie
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // refresh token expires in 30 days
  });

  return true;
}
