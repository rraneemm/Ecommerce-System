import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './carts.service';
import { CartItemDto } from './cart.dto';

@Controller('api/cart')
export class CartsController {
  constructor(private cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() dto: CartItemDto) {
    await this.cartService.addToCart(dto);
    return 'Product added successfully!';
  }

  @Get(':userId')
  async viewCart(@Param('userId', new ParseIntPipe()) userId: number) {
    return await this.cartService.viewCart(userId);
  }

  @Post('update')
  async updateCart(@Body() dto: CartItemDto) {
    await this.cartService.updateCart(dto);
    return 'Product Updated Successfully!';
  }

  @Delete('remove')
  async removeFromCart(@Body() dto: CartItemDto) {
    await this.cartService.removeFromCart(dto);
    return 'Product removed successfully!';
  }
}
