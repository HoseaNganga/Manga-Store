import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  GenreStore,
  ProductStore,
  isAllProductFirstPageLoading,
  isMoreProductsLoading,
} from '../../../stores';
import { Select } from 'primeng/select';
import { Genre } from './model/product.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  ProductCardComponent,
  SectionLoaderComponent,
} from '@mangamarket/manga-market-sharedLib';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    Select,
    ProgressSpinnerModule,
    ProductCardComponent,
    SectionLoaderComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly genreStore = inject(GenreStore);
  private readonly productStore = inject(ProductStore);
  private readonly route = inject(ActivatedRoute);
  formGroup!: FormGroup;
  genres!: Genre[];
  selectedGenreId = signal<string | undefined>(undefined);
  readonly myCategories = computed(() => this.genreStore.genres());
  readonly categoriesloading = computed(() => this.genreStore.loading());
  readonly allMangaLoading = computed(() => this.productStore.loading());
  readonly allManga = computed(() => this.productStore.products().results);
  readonly currentPage = computed(
    () => this.productStore.products().currentPage
  );
  readonly totalPages = computed(() => this.productStore.products().totalPages);
  readonly firstPageLoading = isAllProductFirstPageLoading;
  readonly moreMangaLoading = isMoreProductsLoading;

  ngOnInit(): void {
    this.genreStore.loadGenres();

    const genreIdFromUrl = this.route.snapshot.queryParamMap.get('genreId');
    if (genreIdFromUrl) {
      setTimeout(() => {
        const matched = this.genreStore
          .genres()
          .find((g) => g.id === genreIdFromUrl);
        if (matched) {
          this.formGroup.get('selectedGenre')?.setValue(matched);
          this.selectedGenreId.set(matched.id);
          this.productStore.loadAllProducts(matched.id);
        } else {
          this.productStore.loadAllProducts();
        }
      }, 200);
    } else {
      this.productStore.loadAllProducts();
    }

    this.formGroup = new FormGroup({
      selectedGenre: new FormControl<Genre | null>(null),
    });
    this.formGroup
      .get('selectedGenre')
      ?.valueChanges.subscribe((genre: Genre | null) => {
        const genreId: string | undefined = genre?.id ?? undefined;
        this.selectedGenreId.set(genreId);
        this.productStore.loadAllProducts(genreId);
      });
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 200;
    const scrolledToBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - threshold;

    if (scrolledToBottom && !this.allMangaLoading()) {
      const nextPage = this.currentPage() + 1;
      if (nextPage <= this.totalPages()) {
        this.productStore.loadAllProducts(
          this.selectedGenreId(),
          true,
          nextPage,
          10
        );
      }
    }
  }
}
