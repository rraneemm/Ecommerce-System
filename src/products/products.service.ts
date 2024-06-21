import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(dto: ProductDto) {
    const product = await this.prisma.products.create({
      data: {
        productName: dto.productName,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
      },
    });
    console.log(dto);
    return product;
  }
  async viewAll() {
    return await this.prisma.products.findMany({});
  }
}
