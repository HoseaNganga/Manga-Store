import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GET_PRODUCTS, ProductState } from './models/stores.model';
import { Apollo } from 'apollo-angular';
import { inject } from '@angular/core';
import { Product } from '@prisma/client';
import { tap } from 'rxjs';

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  trendingProducts: [],
  newArrivals: [],
  topRatedProducts: [],
  loading: false,
  error: null,
  loadingFeatured: false,
  loadingTrending: false,
  loadingNewArrivals: false,
  loadingTopRated: false,
  hasFetchedFeatured: false,
  hasFetchedTrending: false,
  hasFetchedNewArrivals: false,
  hasFetchedTopRated: false,
};

export const ProductStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadAllProducts() {
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
    loadFeaturedProducts() {
      patchState(store, { loadingFeatured: true, hasFetchedFeatured: true });
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { featured: true },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, {
                featuredProducts: data.products,
                loadingFeatured: false,
              }),
            error: (error) =>
              patchState(store, {
                error: error.message,
                loadingFeatured: false,
              }),
          })
        )
        .subscribe();
    },
    loadTrendingProducts() {
      patchState(store, { loadingTrending: true, hasFetchedTrending: true });
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { trending: true },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, {
                trendingProducts: data.products,
                loadingTrending: false,
              }),
            error: (error) =>
              patchState(store, {
                error: error.message,
                loadingTrending: false,
              }),
          })
        )
        .subscribe();
    },

    loadNewArrivals() {
      patchState(store, {
        loadingNewArrivals: true,
        hasFetchedNewArrivals: true,
      });
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { isNew: true },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, {
                newArrivals: data.products,
                loadingNewArrivals: false,
              }),
            error: (error) =>
              patchState(store, {
                error: error.message,
                loadingNewArrivals: false,
              }),
          })
        )
        .subscribe();
    },

    loadTopRatedProducts(minRating = 4.8) {
      patchState(store, { loadingTopRated: true, hasFetchedTopRated: true });
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { minRating },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, {
                topRatedProducts: data.products,
                loadingTopRated: false,
              }),
            error: (error) =>
              patchState(store, {
                error: error.message,
                loadingTopRated: false,
              }),
          })
        )
        .subscribe();
    },
  }))
);
