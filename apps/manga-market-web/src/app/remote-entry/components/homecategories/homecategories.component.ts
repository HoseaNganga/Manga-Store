import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselComponent } from '@mangamarket/manga-market-sharedLib';
import { GenreStore } from '../../../stores/genre.store';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-homecategories',
  imports: [CommonModule, UiCarouselComponent, ProgressSpinner],
  templateUrl: './homecategories.component.html',
  styleUrl: './homecategories.component.scss',
})
export class HomecategoriesComponent {
  private readonly genreStore = inject(GenreStore);

  readonly myCategories = computed(() => this.genreStore.genres());
  readonly loading = computed(() => this.genreStore.loading());
}
