import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { HeroModule } from './hero/hero.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'apps/manga-market-be/dist/schema.gql'
      ),
      introspection: true,
      csrfPrevention: true,
    }),
    ProductsModule,
    HeroModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
