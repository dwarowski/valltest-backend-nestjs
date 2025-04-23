import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';

import { ChangePasswordDto } from '../../features/users/change-user-password/change-password.dto';
import { UserDto } from 'src/features/users/get-user/get-user-dto';
import { GetUserService } from 'src/features/users/get-user/get-user.service';
import { ChangeUserPasswordService } from 'src/features/users/change-user-password/change-user-password.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly changePasswordService: ChangeUserPasswordService,
  ) {}

  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: string): Promise<UserDto> {
    return this.getUserService.execute(id, 'id');
  }

  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    return await this.changePasswordService.execute(changePasswordDto);
  }
}
