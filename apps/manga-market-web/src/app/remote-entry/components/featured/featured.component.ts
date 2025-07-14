import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../../../stores/product.store';
import {
  SectionHeaderComponent,
  UiCarouselComponent,
  SectionLoaderComponent,
} from '@mangamarket/manga-market-sharedLib';

@Component({
  selector: 'app-featured',
  imports: [
    CommonModule,
    UiCarouselComponent,
    SectionHeaderComponent,
    SectionLoaderComponent,
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent {
  private readonly productStore = inject(ProductStore);

  readonly featuredProducts = computed(() =>
    this.productStore.featuredProducts()
  );
  readonly topRatedProducts = computed(() =>
    this.productStore.topRatedProducts()
  );
  readonly topTrendingProducts = computed(() =>
    this.productStore.trendingProducts()
  );

  readonly featuredProductsLoading = computed(
    () =>
      this.productStore.loadingFeatured() &&
      this.productStore.hasFetchedFeatured()
  );
  readonly topRatedProductsLoading = computed(
    () =>
      this.productStore.loadingTopRated() &&
      this.productStore.hasFetchedTopRated()
  );
  readonly trendingProductsLoading = computed(
    () =>
      this.productStore.loadingTrending() &&
      this.productStore.hasFetchedTrending()
  );
}
