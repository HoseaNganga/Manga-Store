import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
/* import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs'; */
import { NavbarComponent } from '../global/navbar/navbar.component';
import { query, SearchStore, showSearch } from '../../../stores';
import {
  SectionLoaderComponent,
  ProductCardComponent,
} from '@mangamarket/manga-market-sharedLib';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    NavbarComponent,
    SectionLoaderComponent,
    ProductCardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly searchQuery = query;
  readonly showSearch = showSearch;
  readonly hasQuery = computed(() => this.searchQuery().trim().length > 0);
  private readonly searchStore = inject(SearchStore);
  private readonly route = inject(ActivatedRoute);
  readonly results = computed(() => this.searchStore.results());
  readonly loading = computed(() => this.searchStore.loading());
  hasSearched = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const term = params['query']?.trim() || '';
      query.set(term);

      if (term.length > 0) {
        this.searchStore.searchProducts(term);
        this.hasSearched.set(false);
      } else {
        this.searchStore.clearSearch();
        this.hasSearched.set(false);
      }
    });

    showSearch.set(true);
  }

  ngOnDestroy(): void {
    this.searchStore.clearSearch();
    showSearch.set(false);
    this.hasSearched.set(false);
  }
}
