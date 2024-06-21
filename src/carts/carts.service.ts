import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItemDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(dto: CartItemDto) {
    const product = await this.prisma.products.findUnique({
      where: { productId: dto.productId },
    });

    const price = product.price;

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: dto.userId,
      },
      select: {
        cartId: true,
      },
    });

    const cartId = cart.cartId;

    const existingCartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId: dto.productId,
        },
      },
    });

    if (existingCartItem) {
      await this.prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + dto.quantity,
          totalPrice: existingCartItem.totalPrice + dto.quantity * price,
        },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          product: {
            connect: {
              productId: dto.productId,
            },
          },
          quantity: dto.quantity,
          totalPrice: dto.quantity * price,
          cart: {
            connect: {
              cartId,
            },
          },
        },
      });
    }
  }

  async viewCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        CartItem: {
          select: {
            productId: true,
            quantity: true,
            totalPrice: true,
          },
        },
      },
    });
    // need to fetch the cart Items
    return cart;
  }

  async updateCart(dto: CartItemDto) {
    const product = await this.prisma.products.findUnique({
      where: { productId: dto.productId },
    });

    const price = product.price;

    const cart = await this.prisma.cart.findUnique({
      where: { userId: dto.userId },
    });

    const cartId = cart.cartId;

    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId: dto.productId,
        },
      },
    });

    const cartItemId = cartItem.id;

    const updatedCart = await this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: cartItem.quantity + dto.quantity,
        totalPrice: cartItem.totalPrice + dto.quantity * price,
      },
    });
    return updatedCart;
  }
  async removeFromCart(dto: CartItemDto) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: dto.userId,
      },
    });

    const cartId = cart.cartId;

    const updatedCart = await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
          productId: dto.productId,
        },
      },
    });
    return updatedCart;
  }
}
