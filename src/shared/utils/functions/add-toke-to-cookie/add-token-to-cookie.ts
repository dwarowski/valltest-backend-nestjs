import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

export function addTokenToCookie(
  access_token: string,
  refresh_token: string,
  res: Response,
) {
  if (!access_token) {
    throw new UnauthorizedException();
  }

  res.cookie('access_token', access_token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie('refresh_token', refresh_token, { // Добавлено refresh_token cookie
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // refresh token expires in 30 days
  });


  return true;
}
