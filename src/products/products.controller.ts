import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './product.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private product: ProductService) {}

  @Post('add')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: ProductDto, description: 'Product Json details' })
  addProducts(@Body() dto: ProductDto) {
    return this.product.addProduct(dto);
  }

  @Post('view')
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: ProductDto, description: 'Product Json details' })
  viewAll() {
    return this.product.viewAll();
  }
}
