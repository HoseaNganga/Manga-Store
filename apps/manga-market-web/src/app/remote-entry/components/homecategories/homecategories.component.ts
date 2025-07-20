import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselComponent } from '@mangamarket/manga-market-sharedLib';
import { GenreStore } from '../../../stores/genre.store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { Genre } from '@prisma/client';

@Component({
  selector: 'app-homecategories',
  imports: [CommonModule, UiCarouselComponent, ProgressSpinner],
  templateUrl: './homecategories.component.html',
  styleUrl: './homecategories.component.scss',
})
export class HomecategoriesComponent {
  private readonly genreStore = inject(GenreStore);
  private readonly router = inject(Router);
  readonly myCategories = computed(() => this.genreStore.genres());
  readonly loading = computed(() => this.genreStore.loading());
  onCategoryClick(category: Genre) {
    this.router.navigate(['/mangas'], {
      queryParams: { genreId: category.id },
    });
  }
}
