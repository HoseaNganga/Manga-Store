import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import {
  ProductStore,
  isFeaturedFirstPageLoading,
  isTrendingFirstPageLoading,
  isTopRatedFirstPageLoading,
  isNewArrivalsFirstPageLoading,
} from '../../../stores';
import {
  SectionLoaderComponent,
  ProductCardComponent,
} from '@mangamarket/manga-market-sharedLib';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Product } from '@prisma/client';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SectionLoaderComponent,
    ProgressSpinnerModule,
    ProductCardComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productStore = inject(ProductStore);

  category = signal<string>('');
  title = signal<string>('');
  readonly isFetchingNextPage = signal(false);

  readonly products = computed<Product[]>(() => {
    const category = this.category();
    switch (category) {
      case 'featured':
        return this.productStore.featuredProducts().results;
      case 'trending':
        return this.productStore.trendingProducts().results;
      case 'newArrivals':
        return this.productStore.newArrivals().results;
      case 'topRated':
        return this.productStore.topRatedProducts().results;
      default:
        return [];
    }
  });

  readonly isLoading = computed(() => {
    const category = this.category();
    switch (category) {
      case 'featured':
        return this.productStore.loadingFeatured();
      case 'trending':
        return this.productStore.loadingTrending();
      case 'newArrivals':
        return this.productStore.loadingNewArrivals();
      case 'topRated':
        return this.productStore.loadingTopRated();
      default:
        return false;
    }
  });

  readonly isFirstPageLoading = computed(() => {
    const category = this.category();
    switch (category) {
      case 'featured':
        return isFeaturedFirstPageLoading();
      case 'trending':
        return isTrendingFirstPageLoading();
      case 'newArrivals':
        return isNewArrivalsFirstPageLoading();
      case 'topRated':
        return isTopRatedFirstPageLoading();
      default:
        return false;
    }
  });

  readonly currentPage = computed(() => {
    const category = this.category();
    switch (category) {
      case 'featured':
        return this.productStore.featuredProducts().currentPage;
      case 'trending':
        return this.productStore.trendingProducts().currentPage;
      case 'newArrivals':
        return this.productStore.newArrivals().currentPage;
      case 'topRated':
        return this.productStore.topRatedProducts().currentPage;
      default:
        return 1;
    }
  });

  readonly totalPages = computed(() => {
    const category = this.category();
    switch (category) {
      case 'featured':
        return this.productStore.featuredProducts().totalPages;
      case 'trending':
        return this.productStore.trendingProducts().totalPages;
      case 'newArrivals':
        return this.productStore.newArrivals().totalPages;
      case 'topRated':
        return this.productStore.topRatedProducts().totalPages;
      default:
        return 1;
    }
  });

  readonly isPaginating = computed(() => {
    const category = this.category();
    const currentPage = this.currentPage();
    switch (category) {
      case 'featured':
        return this.productStore.loadingFeatured() && currentPage > 1;
      case 'trending':
        return this.productStore.loadingTrending() && currentPage > 1;
      case 'newArrivals':
        return this.productStore.loadingNewArrivals() && currentPage > 1;
      case 'topRated':
        return this.productStore.loadingTopRated() && currentPage > 1;
      default:
        return false;
    }
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cat = params.get('category');
      if (cat) {
        this.category.set(cat);
        this.title.set(this.formatCategoryTitle(cat));
        this.loadCategory(cat, false, 1);
      }
    });
  }

  private formatCategoryTitle(category: string): string {
    const map: Record<string, string> = {
      featured: 'Featured Manga',
      trending: 'Trending Manga',
      newArrivals: 'New Arrivals',
      topRated: 'Top Rated Manga',
    };
    return map[category] || 'Manga';
  }

  private loadCategory(category: string, append = false, page = 1): void {
    this.isFetchingNextPage.set(append);

    switch (category) {
      case 'featured':
        this.productStore.loadFeaturedProducts(append, page, 10);
        break;
      case 'trending':
        this.productStore.loadTrendingProducts(append, page, 10);
        break;
      case 'newArrivals':
        this.productStore.loadNewArrivals(append, page, 10);
        break;
      case 'topRated':
        this.productStore.loadTopRatedProducts(4.8, append, page, 10);
        break;
    }

    setTimeout(() => this.isFetchingNextPage.set(false), 500);
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const threshold = 200;
    const scrolledToBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - threshold;

    if (
      scrolledToBottom &&
      !this.isFirstPageLoading() &&
      !this.isFetchingNextPage()
    ) {
      const nextPage = this.currentPage() + 1;
      if (nextPage <= this.totalPages()) {
        this.loadCategory(this.category(), true, nextPage);
      }
    }
  }
}
