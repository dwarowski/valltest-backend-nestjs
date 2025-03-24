import { Body, Controller, Post } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';
import { assignRoleDto } from './dto/assign-role.dto';

@Controller('roles-users')
export class RolesUsersController {
    constructor(private readonly rolesUsersService: RolesUsersService) { }

    @Post()
    addRoleToUser(@Body() dto: assignRoleDto) {
        const {role, user} = dto
        return this.rolesUsersService.addRoleToUser(role, user)
    }
}
