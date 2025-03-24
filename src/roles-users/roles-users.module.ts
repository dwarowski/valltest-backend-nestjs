import { Module } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesUsersEntity } from './entity/roles-users.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UserModule } from 'src/user/user.module';
import { RolesUsersController } from './roles-users.controller';

@Module({
  imports: [RolesModule, UserModule, TypeOrmModule.forFeature([RolesUsersEntity])],
  providers: [RolesUsersService],
  exports: [RolesUsersService],
  controllers: [RolesUsersController]
})
export class RolesUsersModule {}
