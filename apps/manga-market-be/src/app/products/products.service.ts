import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { title } from 'process';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  async searchProducts(term:string):Promise<Product[]>{
    const lowercaseTerm=term.toLowerCase();
    return this.prisma.product.findMany({
      where:{
        OR:[
          {title:{contains:lowercaseTerm,mode:'insensitive'}},
          {author:{contains:lowercaseTerm,mode:'insensitive'}}
        ]
      }
    })
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
