// src/users/users.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }
}