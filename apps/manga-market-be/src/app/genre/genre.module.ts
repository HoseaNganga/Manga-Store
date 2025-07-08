import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [GenreResolver, GenreService],
  imports: [PrismaModule],
})
export class GenreModule {}
