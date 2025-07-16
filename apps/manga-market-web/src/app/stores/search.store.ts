import { signal, computed, inject } from '@angular/core';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { Apollo } from 'apollo-angular';
import { PaginatedProductData, SEARCH_PRODUCTS, SearchState } from './index';
import { tap } from 'rxjs';

export const query = signal('');
export const showSearch = signal(false);
export const isSearching = computed(() => query().trim().length > 0);

const initialState: SearchState = {
  results: {
    results: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  },
  loading: false,
  error: null,
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    searchProducts(term: string, page = 1, limit = 10) {
      patchState(store, {
        loading: true,
        error: null,
        results: {
          results: [],
          currentPage: 1,
          totalPages: 0,
          totalCount: 0,
        },
      });

      apollo
        .watchQuery<{ searchProducts: PaginatedProductData }>({
          query: SEARCH_PRODUCTS,
          variables: { term, page, limit },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, {
                results: data.searchProducts,
                loading: false,
              });
            },
            error: (err) =>
              patchState(store, {
                error: err.message,
                loading: false,
              }),
          })
        )
        .subscribe();
    },
    clearSearch() {
      patchState(store, {
        results: {
          results: [],
          currentPage: 1,
          totalPages: 0,
          totalCount: 0,
        },
        loading: false,
        error: null,
      });
    },
  }))
);
