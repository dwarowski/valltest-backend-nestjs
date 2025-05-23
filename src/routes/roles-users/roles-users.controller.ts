import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AddRoleToUserDto } from 'src/features/roles-users/add-role-to-user/add-role-to-user.dto';
import { AddRoleToUsersService } from 'src/features/roles-users/add-role-to-user/add-roles-to-user.service';
import { RemoveRoleDto } from 'src/features/roles-users/remove-role/remove-role.dto';
import { RemoveRoleService } from 'src/features/roles-users/remove-role/remove-role.service';
import { Roles } from 'src/shared/utils/decorators/roles-decorator';

@ApiTags('Roles management')
@Controller('roles-users')
export class RolesUsersController {
  constructor(
    private readonly addRoleToUsersService: AddRoleToUsersService,
    private readonly removeRoleRelation: RemoveRoleService,
  ) {}

  @Post()
  @Roles('admin')
  @ApiOperation({
    summary: 'User roles management',
    description: 'admin endpoint to give user roles',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  addRoleToUser(@Body() dto: AddRoleToUserDto): Promise<void> {
    return this.addRoleToUsersService.execute(dto);
  }

  @Delete()
  @Roles('admin')
  @ApiOperation({
    summary: 'User roles management',
    description: 'admin endpoint to remove user roles',
  })
  @ApiBearerAuth()
  @ApiCookieAuth()
  removeRole(@Body() dto: RemoveRoleDto): Promise<void> {
    return this.removeRoleRelation.execute(dto);
  }
}
