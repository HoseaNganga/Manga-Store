import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroResolver } from './hero.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [HeroResolver, HeroService],
  imports: [PrismaModule],
})
export class HeroModule {}
