import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { query, SearchStore, showSearch } from '../../../stores';
import { SectionLoaderComponent } from '@mangamarket/manga-market-sharedLib';

@Component({
  selector: 'app-search',
  imports: [CommonModule, NavbarComponent, SectionLoaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  readonly searchQuery = query;
  readonly showSearch = showSearch;
  readonly hasQuery = computed(() => this.searchQuery().trim().length > 0);
  private readonly searchStore = inject(SearchStore);
  readonly results = computed(() => this.searchStore.results());
  readonly loading = computed(() => this.searchStore.loading());

  constructor() {
    showSearch.set(true);

    toObservable(query)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((q) => q.trim().length > 0)
      )
      .subscribe((debouncedQuery) => {
        this.searchStore.searchProducts(debouncedQuery.trim());
      });
  }
}
