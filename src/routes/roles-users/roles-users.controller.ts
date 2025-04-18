import { Body, Controller, Delete, Post } from '@nestjs/common';

import { roleDto } from '../../features/roles-users/dto/role.dto';
import { RolesUsersService } from '../../features/roles-users/roles-users.service';

@Controller('roles-users')
export class RolesUsersController {
  constructor(private readonly rolesUsersService: RolesUsersService) {}

  @Post()
  addRoleToUser(@Body() dto: roleDto) {
    return this.rolesUsersService.addRoleToUser(dto);
  }

  @Delete()
  removeRole(@Body() dto: roleDto) {
    return this.rolesUsersService.deleteRoleRelation(dto);
  }
}
