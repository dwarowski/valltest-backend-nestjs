import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '../../entities/roles/role.entity';
import { CreateRolesService } from 'src/features/roles/create-role/create-roles.service';
import { GetRolesService } from 'src/features/roles/get-role/get-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [CreateRolesService, GetRolesService],
  controllers: [],
  exports: [GetRolesService],
})
export class RolesModule {}
