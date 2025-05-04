import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { tokenPayload } from './token-payload';

export async function extractToken(req: Request): Promise<tokenPayload> {
  const jwtService = new JwtService();
  const cookieToken: string | undefined = req.cookies['access_token'];
  const authHeader = req.headers.authorization;
  let headerToken: string | undefined;

  if (authHeader) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer') {
      headerToken = token;
    }
  }

  const token = cookieToken || headerToken;

  if (!token) {
    throw new NotFoundException('No token found in header or cookie');
  }

  try {
    const payload = await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return payload;
  } catch {
    throw new UnauthorizedException('Invalid or expired/no access token.');
  }
}
