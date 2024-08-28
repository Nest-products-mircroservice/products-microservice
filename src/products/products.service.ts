import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count();

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page,
        last_page: Math.ceil(totalPages / limit),
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found with id: ' + id);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    
    return this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}