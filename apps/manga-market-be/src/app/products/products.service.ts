import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { Product as PrismaProduct, Genre as PrismaGenre } from '@prisma/client';

type ProductWithGenres = PrismaProduct & { genres: PrismaGenre[] };

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  async findAll(filters: {
    featured?: boolean;
    isNew?: boolean;
    trending?: boolean;
    minRating?: number;
  }) {
    const { featured, isNew, trending, minRating } = filters;

    return this.prisma.product.findMany({
      where: {
        ...(featured !== undefined && { featured }),
        ...(isNew !== undefined && { isNew }),
        ...(trending !== undefined && { trending }),
        ...(minRating !== undefined && { rating: { gte: minRating } }),
      },
      include: {
        genres: true,
      },
    });
  }

  async findOne(id: string): Promise<ProductWithGenres | null> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        genres: true,
      },
    });
  }

  async searchProducts(term: string): Promise<ProductWithGenres[]> {
    const lowercaseTerm = term.toLowerCase();
    return this.prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: lowercaseTerm, mode: 'insensitive' } },
          { author: { contains: lowercaseTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        genres: true,
      },
    });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
