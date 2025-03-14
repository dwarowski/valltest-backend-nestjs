// src/users/users.controller.ts
import { 
    Controller, 
    Get, 
    Param, 
    Patch,
    Post,
    Body,
    Delete,
    NotFoundException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true })) // Включаем валидацию
  async updateProfile(
    @Param('id') id: string,
    @Body() updateData: UpdateUserDto, // Используем DTO для валидации
  ): Promise<User> {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/change-password')
  @UsePipes(new ValidationPipe({ transform: true })) // Включаем валидацию
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.usersService.changePassword(id, changePasswordDto);
  }


  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}