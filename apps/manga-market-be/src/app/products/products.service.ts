import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import {
  Product as PrismaProduct,
  Genre as PrismaGenre,
  Prisma,
} from '@prisma/client';

type ProductWithGenres = PrismaProduct & { genres: PrismaGenre[] };

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  async findAll(
    filters: {
      featured?: boolean;
      isNew?: boolean;
      trending?: boolean;
      minRating?: number;
      genreId?: string;
    },
    pagination: {
      page: number;
      limit: number;
    }
  ) {
    const { featured, isNew, trending, minRating, genreId } = filters;
    const { page, limit } = pagination;

    const where = {
      ...(featured !== undefined && { featured }),
      ...(isNew !== undefined && { isNew }),
      ...(trending !== undefined && { trending }),
      ...(minRating !== undefined && { rating: { gte: minRating } }),
      ...(genreId && {
        genres: {
          some: {
            id: genreId,
          },
        },
      }),
    };

    const skip = (page - 1) * limit;
    const take = limit;

    const [results, totalCount] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: { genres: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      results,
      totalCount,
      totalPages,
      currentPage: page,
    };
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

  async searchProducts(
    term: string,
    page: number,
    limit: number
  ): Promise<{
    results: ProductWithGenres[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> {
    const skip = (page - 1) * limit;
    const lowercaseTerm = term.toLowerCase();
    const where: Prisma.ProductWhereInput = {
      OR: [
        {
          title: {
            contains: lowercaseTerm,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          author: {
            contains: lowercaseTerm,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    };

    const [results, totalCount] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { genres: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      results,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
