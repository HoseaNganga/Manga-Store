import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../../../stores/product.store';
import {
  SectionHeaderComponent,
  UiCarouselComponent,
} from '@mangamarket/manga-market-sharedLib';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-featured',
  imports: [
    CommonModule,
    UiCarouselComponent,
    SectionHeaderComponent,

    ProgressSpinner,
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent {
  private readonly productStore = inject(ProductStore);

  readonly featuredProducts = computed(
    () => this.productStore.featuredProducts().results
  );
  readonly topRatedProducts = computed(
    () => this.productStore.topRatedProducts().results
  );
  readonly topTrendingProducts = computed(
    () => this.productStore.trendingProducts().results
  );

  readonly featuredProductsLoading = computed(() =>
    this.productStore.loadingFeatured()
  );
  readonly topRatedProductsLoading = computed(() =>
    this.productStore.loadingTopRated()
  );
  readonly trendingProductsLoading = computed(() =>
    this.productStore.loadingTrending()
  );
}
