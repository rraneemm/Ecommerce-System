import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './carts.service';
import { CartItemDto, RemoveCartItemDto } from './cart.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartsController {
  constructor(private cartService: CartService) {}

  @Post('add')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CartItemDto, description: 'Cart Item Json details' })
  async addToCart(@Body() dto: CartItemDto) {
    await this.cartService.addToCart(dto);
    return 'Product added successfully!';
  }

  @Get(':userId')
  async viewCart(@Param('userId', new ParseIntPipe()) userId: number) {
    return await this.cartService.viewCart(userId);
  }

  @Put('update')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CartItemDto, description: 'Cart Item Json details' })
  async updateCart(@Body() dto: CartItemDto) {
    await this.cartService.updateCart(dto);
    return 'Product Updated Successfully!';
  }

  @Delete('remove')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CartItemDto, description: 'Cart Item Json details' })
  async removeFromCart(@Body() dto: RemoveCartItemDto) {
    await this.cartService.removeFromCart(dto);
    return 'Product removed successfully!';
  }
}
