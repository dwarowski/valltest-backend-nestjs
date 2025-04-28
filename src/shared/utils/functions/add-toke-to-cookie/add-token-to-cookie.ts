import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

export function addTokenToCookie(
  access_token: string,
  res: Response,
  message: string,
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

  return { message: message };
}
