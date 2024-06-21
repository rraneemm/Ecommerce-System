import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './order.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('/api/orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateOrderDto, description: 'Order Json details' })
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UpdateOrderStatusDto, description: 'Order Json details' })
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    dto.orderId = orderId;
    return await this.orderService.updateOrderStatus(dto);
  }
}
