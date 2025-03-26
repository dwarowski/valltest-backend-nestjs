import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from 'src/roles/roles.module';
import { UserModule } from 'src/user/user.module';

import { RolesUsersEntity } from './entity/roles-users.entity';
import { RolesUsersController } from './roles-users.controller';
import { RolesUsersService } from './roles-users.service';

@Module({
  imports: [
    RolesModule,
    UserModule,
    TypeOrmModule.forFeature([RolesUsersEntity]),
  ],
  providers: [RolesUsersService],
  exports: [RolesUsersService],
  controllers: [RolesUsersController],
})
export class RolesUsersModule {}
