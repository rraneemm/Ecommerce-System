import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { OrdersService } from 'src/orders/orders.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, OrdersService],
})
export class UsersModule {}
