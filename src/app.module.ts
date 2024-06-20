import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CartsModule } from './carts/carts/carts.module';
import { OrdersModule } from './orders/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    PrismaModule,
  ],
})
export class AppModule {}
