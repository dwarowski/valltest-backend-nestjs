import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from 'src/routes/roles/roles.module';
import { UserModule } from 'src/routes/users/user.module';

import { RolesUsersEntity } from '../../entities/roles-users/roles-users.entity';
import { RolesUsersController } from './roles-users.controller';
import { AddRoleToUsersService } from 'src/features/roles-users/add-role-to-user/add-roles-to-user.service';
import { GetUserRoleService } from 'src/features/roles-users/get-user-role/get-user-role.service';
import { RemoveRoleService } from 'src/features/roles-users/remove-role/remove-role.service';

@Module({
  imports: [
    RolesModule,
    UserModule,
    TypeOrmModule.forFeature([RolesUsersEntity]),
  ],
  providers: [AddRoleToUsersService, GetUserRoleService, RemoveRoleService],
  exports: [GetUserRoleService],
  controllers: [RolesUsersController],
})
export class RolesUsersModule {}
