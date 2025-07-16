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
};

export const ProductStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadAllProducts() {
      patchState(store, { loading: true });
      console.log('🔄 Fetching All Products...');
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              console.log('✅ All Proucts Loaded');

              patchState(store, { products: data.products, loading: false });
            },

            error: (error) => {
              console.log('✅ Error Loading All Products');

              patchState(store, { error: error.message, loading: false });
            },
          })
        )
        .subscribe();
    },
    loadFeaturedProducts() {
      patchState(store, { loadingFeatured: true });
      console.log('🔄 Fetching Featured Products...');
      apollo
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { featured: true },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              console.log('✅ All Featured Proucts Loaded');
              patchState(store, {
                featuredProducts: data.products,
                loadingFeatured: false,
              });
            },

            error: (error) => {
              console.log('Error Loading Featured Proucts');
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
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { trending: true },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              console.log('✅ All Trending Proucts Loaded');
              patchState(store, {
                trendingProducts: data.products,
                loadingTrending: false,
              });
            },

            error: (error) => {
              console.log('Error Fetching Trending Products!');
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
        .watchQuery<{ products: Product[] }>({
          query: GET_PRODUCTS,
          variables: { isNew: true },
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              console.log('Successfuly Fetched isNewProducts! ');
              patchState(store, {
                newArrivals: data.products,
                loadingNewArrivals: false,
              });
            },

            error: (error) => {
              console.log('Error Fetching isNewProducts');
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
