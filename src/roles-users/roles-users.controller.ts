import { Body, Controller, Delete, Post } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';
import { roleDto } from './dto/role.dto';

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
