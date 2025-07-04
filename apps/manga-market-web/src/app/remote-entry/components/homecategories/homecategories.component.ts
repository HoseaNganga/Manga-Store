import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselComponent } from '@mangamarket/manga-market-sharedLib';
import { GenreStore } from '../../../stores/genre.store';

@Component({
  selector: 'app-homecategories',
  imports: [CommonModule, UiCarouselComponent],
  templateUrl: './homecategories.component.html',
  styleUrl: './homecategories.component.scss',
})
export class HomecategoriesComponent implements OnInit {
  private readonly genreStore = inject(GenreStore);

  ngOnInit(): void {
    this.genreStore.loadGenres();
  }
  readonly myCategories = computed(() => this.genreStore.genres());
}
