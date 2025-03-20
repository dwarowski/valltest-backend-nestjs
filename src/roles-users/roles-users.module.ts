import { Module } from '@nestjs/common';
import { RolesUsersService } from './roles-users.service';

@Module({
  providers: [RolesUsersService]
})
export class RolesUsersModule {}
