import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  GET_PRODUCTS,
  PaginatedProductData,
  ProductState,
} from './models/stores.model';
import { Apollo } from 'apollo-angular';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

const initialState: ProductState = {
  products: {
    results: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  },
  featuredProducts: {
    results: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  },
  trendingProducts: {
    results: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  },
  newArrivals: {
    results: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  },
  topRatedProducts: {
    results: [],
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  },
  loading: false,
  error: null,
  loadingFeatured: false,
  loadingTrending: false,
  loadingNewArrivals: false,
  loadingTopRated: false,
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
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { page: 1, limit: 10 },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, { products: data.products, loading: false });
            },

            error: (error) => {
              patchState(store, { error: error.message, loading: false });
            },
          })
        )
        .subscribe();
    },
    loadFeaturedProducts() {
      patchState(store, { loadingFeatured: true });

      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { featured: true, page: 1, limit: 10 },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, {
                featuredProducts: data.products,
                loadingFeatured: false,
              });
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingFeatured: false,
              });
            },
          })
        )
        .subscribe();
    },
    loadTrendingProducts() {
      patchState(store, { loadingTrending: true });
      console.log('🔄 Fetching Trending Products...');
      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { trending: true, page: 1, limit: 10 },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, {
                trendingProducts: data.products,
                loadingTrending: false,
              });
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingTrending: false,
              });
            },
          })
        )
        .subscribe();
    },

    loadNewArrivals() {
      patchState(store, {
        loadingNewArrivals: true,
      });
      console.log('Fetching isNew Products!');
      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { isNew: true, page: 1, limit: 10 },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, {
                newArrivals: data.products,
                loadingNewArrivals: false,
              });
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingNewArrivals: false,
              });
            },
          })
        )
        .subscribe();
    },

    loadTopRatedProducts(minRating = 4.8) {
      patchState(store, { loadingTopRated: true });
      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { minRating, page: 1, limit: 10 },
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
