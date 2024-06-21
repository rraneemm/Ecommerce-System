import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './product.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private product: ProductService) {}

  @Post('add')
  addProducts(@Body() dto: ProductDto) {
    return this.product.addProduct(dto);
  }

  @Post('view')
  viewAll() {
    return this.product.viewAll();
  }
}
