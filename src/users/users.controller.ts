import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from 'src/orders/orders.service';

@ApiTags('Auth')
@Controller('api/users')
export class UsersController {
  constructor(
    private userService: UserService,
    private orderService: OrdersService,
  ) {}

  @Post('signUp')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UserDto, description: 'User Json details' })
  singUp(@Body() dto: UserDto) {
    return this.userService.signUp(dto);
  }

  @Post('signIn')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UserDto, description: 'User Json details' })
  singIn(@Body() dto: UserDto) {
    return this.userService.singIn(dto);
  }

  @Get(':userId/orders')
  async getOrdersHistory(@Param('userId', new ParseIntPipe()) userId: number) {
    return await this.orderService.getOrderHistory(userId);
  }
}
