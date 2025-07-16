import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { query, SearchStore, showSearch } from '../../../stores';
import {
  SectionLoaderComponent,
  ProductCardComponent,
} from '@mangamarket/manga-market-sharedLib';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinner } from 'primeng/progressspinner';
import { isFirstPageLoading } from '../../../stores';
@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    NavbarComponent,
    SectionLoaderComponent,
    ProductCardComponent,
    ProgressSpinner,
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
  readonly results = computed(() => this.searchStore.results().results);
  readonly loading = computed(() => this.searchStore.loading());
  readonly pagination = computed(() => this.searchStore.results());
  readonly currentPage = computed(() => this.pagination().currentPage);
  readonly totalPages = computed(() => this.pagination().totalPages);
  hasSearched = signal(false);
  readonly firstPageLoading = isFirstPageLoading;


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

  onScroll(event: Event) {
    const target = event.target as HTMLElement;

    const threshold = 200;
    const scrolledToBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - threshold;

    if (scrolledToBottom && !this.loading() && this.hasQuery()) {
      const nextPage = this.currentPage() + 1;
      if (nextPage <= this.totalPages()) {
        this.searchStore.searchProducts(this.searchQuery(), true, nextPage, 10);
      }
    }
  }

  ngOnDestroy(): void {
    this.searchStore.clearSearch();
    showSearch.set(false);
    this.hasSearched.set(false);
  }
}
