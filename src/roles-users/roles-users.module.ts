import { Module } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesUsersEntity } from './entity/roles-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesUsersEntity])],
  providers: [RolesUsersService]
})
export class RolesUsersModule {}
