import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({
    description: 'ID of the user associated with the cart item',
    type: Number,
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'ID of the product in the cart item',
    type: Number,
    example: 1,
  })
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product in the cart item',
    type: Number,
    example: 2,
  })
  quantity: number;
}

export class RemoveCartItemDto {
  @ApiProperty({
    description: 'ID of the user associated with the cart item',
    type: Number,
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'ID of the product in the cart item',
    type: Number,
    example: 1,
  })
  productId: number;
}
