// import { IsOptional } from 'class-validator';

export class CartItemDto {
  userId: number;
  productId: number;
  quantity: number;
}

export class ViewCartDto {
  userId: number;
}
