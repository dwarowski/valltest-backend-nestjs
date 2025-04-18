import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { extractTokenFromCookie } from 'src/shared/utils/functions/extract-token-from-cookie/token-extract';
import { ROLES_KEY } from 'src/shared/utils/decorators/roles-decorator';
import { RolesUsersService } from 'src/features/roles-users/roles-users.service';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    private RolesUserService: RolesUsersService,
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
