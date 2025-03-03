import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('user')
export class UserController {}
