import { IncomingMessage } from 'http';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/roles-decorator';
import { RolesUsersService } from 'src/roles-users/roles-users.service';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    private RolesUserService: RolesUsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwt = this.extractTokenFromCookies(request);

    try {
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: process.env.JWT_SECRET,
      });

      if (!payload) {
        return false;
      }

      const userRoles = await this.RolesUserService.getUserRoles(
        payload.username,
      );

      return requiredRoles.some((role) => userRoles.includes(role));
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromCookies(request: IncomingMessage): string {
    const cookieHeader = request.headers.cookie;

    if (!cookieHeader) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'access_token') {
        return value;
      }
    }
    throw new UnauthorizedException('No token provided');
  }
}
