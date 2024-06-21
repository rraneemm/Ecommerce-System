import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async totalOrderPrice(orderId: number) {
    if (!orderId) throw new NotFoundException('Order not found');
    else {
      const orderItems = await this.prisma.orderItems.findMany({
        where: {
          orderId,
        },
        select: {
          totalPrice: true,
        },
      });

      const total = orderItems.reduce(
        (sum, items) => sum + items.totalPrice,
        0,
      );

      const orderWithPrice = await this.prisma.orders.update({
        where: {
          orderId,
        },
        data: {
          total,
        },
        include: {
          OrderItems: {
            select: {
              productId: true,
              quantity: true,
              totalPrice: true,
            },
          },
        },
      });

      return orderWithPrice;
    }
  }

  async createOrder(dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        cartId: dto.cartId,
      },
      include: {
        CartItem: {},
      },
    });

    const orderItems = await cart.CartItem.map((items) => ({
      productId: items.productId,
      quantity: items.quantity,
      totalPrice: items.totalPrice,
      cartId: items.cartId,
    }));

    const order = await this.prisma.orders.create({
      data: {
        status: 'PENDING',
        cart: {
          connect: {
            cartId: dto.cartId,
          },
        },
        user: {
          connect: {
            userId: dto.userId,
          },
        },
        OrderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
      include: {
        OrderItems: {
          select: { productId: true, quantity: true, totalPrice: true },
        },
      },
    });

    for (const item of orderItems) {
      await this.prisma.products.update({
        where: {
          productId: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  }

  async getOrderById(orderId: number) {
    if (!orderId) throw new NotFoundException('Order not found');
    const order = await this.totalOrderPrice(orderId);
    return order;
  }

  async updateOrderStatus(dto: UpdateOrderStatusDto) {
    const order = await this.prisma.orders.update({
      where: {
        orderId: dto.orderId,
      },
      data: {
        status: dto.status,
      },
      include: {
        OrderItems: {
          select: { productId: true, quantity: true, totalPrice: true },
        },
      },
    });
    if (dto.status == 'CONFIRMED' || dto.status == 'SHIPPED') {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: dto.cartId },
      });
      //   await this.prisma.orderItems.deleteMany({
      //     where: { orderId: dto.orderId },
      //   });
      //   await this.prisma.orders.delete({ where: { orderId: dto.orderId } });
    }

    return order;
  }

  async getOrderHistory(userId: number) {
    const orders = await this.prisma.orders.findMany({
      where: {
        userId,
      },
      include: {
        OrderItems: {
          select: { productId: true, quantity: true, totalPrice: true },
        },
      },
    });

    return orders;
  }
}
