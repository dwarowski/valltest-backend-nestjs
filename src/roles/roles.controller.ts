import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get(':name')
    getRole(@Param('name') name: string) {
        return this.rolesService.getRole(name)
    }

    @Post()
    createRole(@Body() dto: createRoleDto ) {
        return this.rolesService.createRole(dto)
    }

    @Delete(':name')
    deleteRole(@Param('name') name: string) {
        return this.rolesService.deleteRole(name)
    }


}
