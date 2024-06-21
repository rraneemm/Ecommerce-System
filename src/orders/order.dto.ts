import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID of the cart associated with the order',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  cartId: number;

  @ApiProperty({
    description: 'ID of the user making the order',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Status of the order',
    enum: Status,
    example: Status.CONFIRMED,
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'ID of the order to update',
    type: Number,
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  orderId: number;

  @ApiProperty({
    description: 'ID of the cart associated with the order',
    type: Number,
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  cartId: number;
}
