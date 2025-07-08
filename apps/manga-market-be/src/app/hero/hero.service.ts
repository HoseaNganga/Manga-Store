import { Injectable } from '@nestjs/common';
import { CreateHeroInput } from './dto/create-hero.input';
import { UpdateHeroInput } from './dto/update-hero.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeroService {
  constructor(private readonly prisma: PrismaService) {}
  create(createHeroInput: CreateHeroInput) {
    return 'This action adds a new hero';
  }

  findAll() {
    return this.prisma.heroUrl.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} hero`;
  }

  update(id: number, updateHeroInput: UpdateHeroInput) {
    return `This action updates a #${id} hero`;
  }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
