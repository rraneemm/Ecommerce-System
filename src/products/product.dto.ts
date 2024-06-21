import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Name of the product',
    type: String,
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    description: 'Description of the product',
    type: String,
    example: 'A high-performance laptop',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product in USD',
    type: Number,
    example: 999,
  })
  @IsInt()
  price: number;

  @ApiProperty({
    description: 'Available stock of the product',
    type: Number,
    example: 50,
  })
  @IsInt()
  stock: number;
}
