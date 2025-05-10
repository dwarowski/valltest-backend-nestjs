import { Controller, Get, Param } from '@nestjs/common';

import { GetUserService } from 'src/features/users/get-user/get-user.service';
import { ChangeUserPasswordService } from 'src/features/users/change-user-password/change-user-password.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/features/users/get-user/get-user-dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly _changePasswordService: ChangeUserPasswordService,
  ) {}

  @Get(':username')
  @ApiOperation({
    summary: 'user profile',
    description: 'get user profile by username',
  })
  async getProfile(@Param('username') id: string): Promise<UserDto> {
    return this.getUserService.execute(id, 'username');
  }

  // TODO: Дописать логику в сервисе
  // @Post('change-password')
  // async changePassword(
  //   @Body() changePasswordDto: ChangePasswordDto,
  // ): Promise<string> {
  //   return await this.changePasswordService.execute(changePasswordDto);
  // }
}
