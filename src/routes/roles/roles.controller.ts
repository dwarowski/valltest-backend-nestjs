import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { createRoleDto } from '../../features/roles/dto/create-role.dto';
import { RolesService } from 'src/features/roles/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':name')
  getRole(@Param('name') name: string) {
    return this.rolesService.getRole(name);
  }

  @Post()
  createRole(@Body() dto: createRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Delete(':name')
  deleteRole(@Param('name') name: string) {
    return this.rolesService.deleteRole(name);
  }
}
