import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { tokenPayload } from './token-payload';

export async function extractTokenFromCookie(
  req: Request,
): Promise<tokenPayload> {
  const jwtService = new JwtService();
  const token = req.cookies['access_token'];

  try {
    const payload = await jwtService.verifyAsync(token);
    return payload;
  } catch {
    throw new UnauthorizedException('Invalid or expired/no access token.');
  }
}
