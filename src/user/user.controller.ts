// src/users/users.controller.ts
import { 
    Controller, 
    Get, 
    Param, 
    Patch,
    Body,
    NotFoundException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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
}