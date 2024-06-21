import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto';

@Controller('api/users')
export class UsersController {
  constructor(private user: UserService) {}

  @Post('singUp')
  singUp(@Body() dto: UserDto) {
    return this.user.signUp(dto);
  }

  @Post('singIn')
  singIn(@Body() dto: UserDto) {
    return this.user.singIn(dto);
  }
}
