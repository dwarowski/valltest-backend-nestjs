import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles-decorator";
import { RolesUsersService } from "src/roles-users/roles-users.service";

@Injectable()
export class RolesGuards implements CanActivate {
    constructor(
        private reflector: Reflector,
        private RolesUserService: RolesUsersService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles.length) {
            return true
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.id) {
            return false;
        }

        const userRoles = await this.RolesUserService.getUserRoles(user.name)

        return requiredRoles.some(role => userRoles.includes(role));
    }
}