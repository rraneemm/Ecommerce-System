import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItemDto, RemoveCartItemDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async fetchProductPrice(dto: CartItemDto) {
    const product = await this.prisma.products.findUnique({
      where: { productId: dto.productId },
    });

    const price = product.price;

    return price;
  }

  async fetchCartId(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      select: {
        cartId: true,
      },
    });
    const cartId = cart.cartId;

    return cartId;
  }

  async totalCartPrice(userId: number) {
    const cartId = await this.fetchCartId(userId);

    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cartId,
      },
      select: {
        totalPrice: true,
      },
    });

    const total = cartItems.reduce((sum, items) => sum + items.totalPrice, 0);

    const updatedCart = await this.prisma.cart.update({
      where: {
        cartId,
      },
      data: {
        total,
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

    return updatedCart;
  }

  async addToCart(dto: CartItemDto) {
    try {
      const cartId = await this.fetchCartId(dto.userId);

      const price = await this.fetchProductPrice(dto);

      const product = await this.prisma.products.findUnique({
        where: {
          productId: dto.productId,
        },
        select: {
          stock: true,
        },
      });

      if (product.stock < dto.quantity) throw new Error('Not enough stock');

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

      const cartWithPrice = await this.totalCartPrice(dto.userId);

      return cartWithPrice;
    } catch (error) {
      throw new Error(`Failed to add to cart: ${error.message}`);
    }
  }

  async viewCart(userId: number) {
    const cartWithPrice = await this.totalCartPrice(userId);

    return cartWithPrice;
  }

  async updateCart(dto: CartItemDto) {
    try {
      const price = await this.fetchProductPrice(dto);

      const cartId = await this.fetchCartId(dto.userId);

      const cartItem = await this.prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId,
            productId: dto.productId,
          },
        },
      });

      if (!cartItem) throw new Error('Cart item not found');

      const cartItemId = cartItem.id;

      await this.prisma.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: {
          quantity: cartItem.quantity + dto.quantity,
          totalPrice: cartItem.totalPrice + dto.quantity * price,
        },
      });

      const updatedCartWithPrice = await this.totalCartPrice(dto.userId);

      return updatedCartWithPrice;
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async removeFromCart(dto: RemoveCartItemDto) {
    try {
      const cartId = await this.fetchCartId(dto.userId);

      await this.prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId,
            productId: dto.productId,
          },
        },
      });

      const updatedCartWithPrice = await this.totalCartPrice(dto.userId);

      return updatedCartWithPrice;
    } catch (error) {
      throw new Error(`Failed to remove from cart: ${error.message}`);
    }
  }
}
