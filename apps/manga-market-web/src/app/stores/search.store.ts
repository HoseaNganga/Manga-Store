import { signal, computed, inject } from '@angular/core';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { Apollo } from 'apollo-angular';
import { PaginatedProductData, SEARCH_PRODUCTS, SearchState } from './index';
import { tap } from 'rxjs';

export const query = signal('');
export const showSearch = signal(false);
export const isSearching = computed(() => query().trim().length > 0);
export const isFirstPageLoading = signal(false);

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
    searchProducts(term: string, append = false, page = 1, limit = 10) {
      if (!append && page === 1) {
        isFirstPageLoading.set(true);
      }

      patchState(store, {
        loading: true,
        error: null,
        ...(append
          ? {}
          : {
              results: {
                results: [],
                currentPage: 1,
                totalPages: 0,
                totalCount: 0,
              },
            }),
      });

      apollo
        .watchQuery<{ searchProducts: PaginatedProductData }>({
          query: SEARCH_PRODUCTS,
          variables: { term, page, limit },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              const current = store.results().results;
              patchState(store, {
                results: {
                  ...data.searchProducts,
                  results: append
                    ? [...current, ...data.searchProducts.results]
                    : data.searchProducts.results,
                },
                loading: false,
              });
              isFirstPageLoading.set(false);
            },
            error: (err) => {
              patchState(store, {
                error: err.message,
                loading: false,
              });
              isFirstPageLoading.set(false);
            },
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
