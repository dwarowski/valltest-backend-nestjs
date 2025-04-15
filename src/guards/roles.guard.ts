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
import { extractTokenFromCookie } from 'src/cookie-token/token-extract';

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

    const payload = await extractTokenFromCookie(request);
    
    const userRoles = await this.RolesUserService.getUserRoles(
      payload.username,
    );

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
