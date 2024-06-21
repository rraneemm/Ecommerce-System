import { Module } from '@nestjs/common';
import { CartService } from './carts.service';
import { CartsController } from './carts.controller';

@Module({
  providers: [CartService],
  controllers: [CartsController],
})
export class CartsModule {}
