import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AddRoleToUserDto } from 'src/features/roles-users/add-role-to-user/add-role-to-user.dto';
import { AddRoleToUsersService } from 'src/features/roles-users/add-role-to-user/add-roles-to-user.service';
import { RemoveRoleDto } from 'src/features/roles-users/remove-role/remove-role.dto';
import { RemoveRoleService } from 'src/features/roles-users/remove-role/remove-role.service';

@Controller('roles-users')
export class RolesUsersController {
  constructor(
    private readonly addRoleToUsersService: AddRoleToUsersService,
    private readonly removeRoleRelation: RemoveRoleService,
  ) {}

  @Post()
  addRoleToUser(@Body() dto: AddRoleToUserDto) {
    return this.addRoleToUsersService.addRoleToUser(dto);
  }

  @Delete()
  removeRole(@Body() dto: RemoveRoleDto) {
    return this.removeRoleRelation.deleteRoleRelation(dto);
  }
}
