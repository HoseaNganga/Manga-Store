import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GET_PRODUCTS, ProductState } from './models/stores.model';
import { Apollo } from 'apollo-angular';
import { inject } from '@angular/core';
import { Product } from '@prisma/client';
import { tap } from 'rxjs';

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
};

export const ProductStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadProducts() {
      patchState(store, { loading: true });
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, { products: data.products, loading: false }),
            error: (error) =>
              patchState(store, { error: error.message, loading: false }),
          })
        )
        .subscribe();
    },
  }))
);
