import { Body, Controller, Delete, Post } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';
import { assignRoleDto } from './dto/assign-role.dto';
import { removeRelationDto } from './dto/remove-relation.dto';

@Controller('roles-users')
export class RolesUsersController {
    constructor(private readonly rolesUsersService: RolesUsersService) { }

    @Post()
    addRoleToUser(@Body() dto: assignRoleDto) {
        return this.rolesUsersService.addRoleToUser(dto)
    }

    @Delete()
    removeRole(@Body() dto: removeRelationDto) {
        return this.rolesUsersService.deleteRoleRelation(dto)
    }
}
