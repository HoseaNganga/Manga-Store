import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PaginatedProducts } from './entities/paginated-products.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => PaginatedProducts, { name: 'products' })
  findAll(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('featured', { type: () => Boolean, nullable: true })
    featured?: boolean,
    @Args('isNew', { type: () => Boolean, nullable: true }) isNew?: boolean,
    @Args('trending', { type: () => Boolean, nullable: true })
    trending?: boolean,
    @Args('minRating', { type: () => Number, nullable: true })
    minRating?: number
  ) {
    return this.productsService.findAll(
      { featured, isNew, trending, minRating },
      { page, limit }
    );
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @Query(() => PaginatedProducts, { name: 'searchProducts' })
  searchProducts(
    @Args('term', { type: () => String }) term: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number
  ) {
    return this.productsService.searchProducts(term, page, limit);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
