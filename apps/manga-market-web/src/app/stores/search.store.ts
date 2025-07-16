import { signal, computed } from '@angular/core';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Product } from '@prisma/client';
import { SEARCH_PRODUCTS, SearchState } from './index';
import { tap } from 'rxjs';

export const query = signal('');
export const showSearch = signal(false);
export const isSearching = computed(() => query().trim().length > 0);

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    searchProducts(term: string) {
      patchState(store, { loading: true, error: null, results: [] });

      apollo
        .watchQuery<{ searchProducts: Product[] }>({
          query: SEARCH_PRODUCTS,
          variables: { term },
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
      patchState(store, { results: [], loading: false, error: null });
    },
  }))
);
