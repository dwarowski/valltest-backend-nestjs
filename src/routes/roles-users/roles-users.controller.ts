import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { AddRoleToUserDto } from 'src/features/roles-users/add-role-to-user/add-role-to-user.dto';
import { AddRoleToUsersService } from 'src/features/roles-users/add-role-to-user/add-roles-to-user.service';
import { RemoveRoleDto } from 'src/features/roles-users/remove-role/remove-role.dto';
import { RemoveRoleService } from 'src/features/roles-users/remove-role/remove-role.service';
import { Roles } from 'src/shared/utils/decorators/roles-decorator';

@Controller('roles-users')
export class RolesUsersController {
  constructor(
    private readonly addRoleToUsersService: AddRoleToUsersService,
    private readonly removeRoleRelation: RemoveRoleService,
  ) {}

  @Post()
  @Roles('admin')
  @ApiOperation({
    summary: 'User roles managment',
    description: 'admin endpoint to give user roles',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  addRoleToUser(@Body() dto: AddRoleToUserDto): Promise<boolean> {
    return this.addRoleToUsersService.execute(dto);
  }

  @Delete()
  @Roles('admin')
  @ApiOperation({
    summary: 'User roles managment',
    description: 'admin endpoint to remove user roles',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  removeRole(@Body() dto: RemoveRoleDto) {
    return this.removeRoleRelation.execute(dto);
  }
}
