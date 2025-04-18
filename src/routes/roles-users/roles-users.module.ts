import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from 'src/routes/roles/roles.module';
import { UserModule } from 'src/routes/users/user.module';

import { RolesUsersEntity } from '../../entities/roles-users/roles-users.entity';
import { RolesUsersController } from './roles-users.controller';
import { RolesUsersService } from '../../features/roles-users/roles-users.service';

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
