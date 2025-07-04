import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { Genre as PrismaGenre, Product as PrismaProduct } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type GenreWithProducts = PrismaGenre & { products: PrismaProduct[] };

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}
  create(createGenreInput: CreateGenreInput) {
    return 'This action adds a new genre';
  }

  async findAll(): Promise<GenreWithProducts[]> {
    return this.prisma.genre.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string): Promise<GenreWithProducts | null> {
    return this.prisma.genre.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  update(id: number, updateGenreInput: UpdateGenreInput) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
