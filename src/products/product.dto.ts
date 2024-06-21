import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  stock: number;
}
