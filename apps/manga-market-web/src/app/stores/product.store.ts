import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  GET_PRODUCTS,
  PaginatedProductData,
  ProductState,
} from './models/stores.model';
import { Apollo } from 'apollo-angular';
import { inject, signal } from '@angular/core';
import { tap } from 'rxjs';

export const isAllProductFirstPageLoading = signal(false);
export const isMoreProductsLoading = signal(false);
export const isFeaturedFirstPageLoading = signal(false);
export const isTrendingFirstPageLoading = signal(false);
export const isNewArrivalsFirstPageLoading = signal(false);
export const isTopRatedFirstPageLoading = signal(false);

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
    loadAllProducts(genreId?: string, append = false, page = 1, limit = 10) {
      if (!append && page === 1) {
        isAllProductFirstPageLoading.set(true);
        patchState(store, {
          loading: true,
          error: null,
          products: {
            results: [],
            currentPage: 1,
            totalPages: 0,
            totalCount: 0,
          },
        });
      } else {
        isMoreProductsLoading.set(true);
        patchState(store, {
          loading: true,
          error: null,
        });
      }
      const variables: any = { page, limit };
      if (genreId) {
        variables.genreId = genreId;
      }
      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables,
          fetchPolicy: 'network-only',
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, (state) => {
                const newResults = append
                  ? [...state.products.results, ...data.products.results]
                  : [...data.products.results];

                return {
                  products: {
                    results: newResults,
                    currentPage: data.products.currentPage,
                    totalPages: data.products.totalPages,
                    totalCount: data.products.totalCount,
                  },
                  loading: false,
                };
              });

              isAllProductFirstPageLoading.set(false);
              isMoreProductsLoading.set(false);
            },

            error: (error) => {
              patchState(store, { error: error.message, loading: false });
              isMoreProductsLoading.set(false);
              isAllProductFirstPageLoading.set(false);
            },
          })
        )
        .subscribe();
    },
    loadFeaturedProducts(append = false, page = 1, limit = 10) {
      if (!append && page === 1) {
        isFeaturedFirstPageLoading.set(true);
        patchState(store, (state) => ({
          loadingFeatured: true,
          featuredProducts: {
            results: [],
            currentPage: 1,
            totalPages: 0,
            totalCount: 0,
          },
        }));
      } else {
        patchState(store, {
          loadingFeatured: true,
        });
      }

      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { featured: true, page, limit },
          fetchPolicy: 'network-only',
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, (state) => ({
                featuredProducts: {
                  results: append
                    ? [
                        ...state.featuredProducts.results,
                        ...data.products.results,
                      ]
                    : [...data.products.results],
                  currentPage: data.products.currentPage,
                  totalPages: data.products.totalPages,
                  totalCount: data.products.totalCount,
                },
                loadingFeatured: false,
              }));
              isFeaturedFirstPageLoading.set(false);
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingFeatured: false,
              });
              isFeaturedFirstPageLoading.set(false);
            },
          })
        )
        .subscribe();
    },
    loadTrendingProducts(append = false, page = 1, limit = 10) {
      if (!append && page === 1) {
        isTrendingFirstPageLoading.set(true);
        patchState(store, (state) => ({
          loadingTrending: true,
          trendingProducts: {
            results: [],
            currentPage: 1,
            totalPages: 0,
            totalCount: 0,
          },
        }));
      } else {
        patchState(store, {
          loadingTrending: true,
        });
      }

      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { trending: true, page, limit },
          fetchPolicy: 'network-only',
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, (state) => ({
                trendingProducts: {
                  results: append
                    ? [
                        ...state.trendingProducts.results,
                        ...data.products.results,
                      ]
                    : [...data.products.results],
                  currentPage: data.products.currentPage,
                  totalPages: data.products.totalPages,
                  totalCount: data.products.totalCount,
                },
                loadingTrending: false,
              }));
              isTrendingFirstPageLoading.set(false);
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingTrending: false,
              });
              isTrendingFirstPageLoading.set(false);
            },
          })
        )
        .subscribe();
    },

    loadNewArrivals(append = false, page = 1, limit = 10) {
      if (!append && page == 1) {
        isNewArrivalsFirstPageLoading.set(true);
        patchState(store, (state) => ({
          loadingNewArrivals: true,
          newArrivals: {
            results: [],
            currentPage: 1,
            totalPages: 0,
            totalCount: 0,
          },
        }));
      } else {
        patchState(store, {
          loadingNewArrivals: true,
        });
      }

      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { isNew: true, page, limit },
          fetchPolicy: 'network-only',
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, (state) => ({
                newArrivals: {
                  results: append
                    ? [...state.newArrivals.results, ...data.products.results]
                    : [...data.products.results],
                  currentPage: data.products.currentPage,
                  totalPages: data.products.totalPages,
                  totalCount: data.products.totalCount,
                },
                loadingNewArrivals: false,
              }));
              isNewArrivalsFirstPageLoading.set(false);
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingNewArrivals: false,
              });
              isNewArrivalsFirstPageLoading.set(false);
            },
          })
        )
        .subscribe();
    },

    loadTopRatedProducts(
      minRating = 4.8,
      append = false,
      page = 1,
      limit = 10
    ) {
      if (!append && page == 1) {
        isTopRatedFirstPageLoading.set(true);
        patchState(store, (state) => ({
          loadingTopRated: true,
          topRatedProducts: {
            results: [],
            currentPage: 1,
            totalPages: 0,
            totalCount: 0,
          },
        }));
      } else {
        patchState(store, {
          loadingTopRated: true,
        });
      }

      apollo
        .watchQuery<{ products: PaginatedProductData }>({
          query: GET_PRODUCTS,
          variables: { minRating, page, limit },
          fetchPolicy: 'network-only',
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              patchState(store, (state) => ({
                topRatedProducts: {
                  results: append
                    ? [
                        ...state.topRatedProducts.results,
                        ...data.products.results,
                      ]
                    : [...data.products.results],
                  currentPage: data.products.currentPage,
                  totalPages: data.products.totalPages,
                  totalCount: data.products.totalCount,
                },
                loadingTopRated: false,
              }));
              isTopRatedFirstPageLoading.set(false);
            },

            error: (error) => {
              patchState(store, {
                error: error.message,
                loadingTopRated: false,
              });
              isTopRatedFirstPageLoading.set(false);
            },
          })
        )
        .subscribe();
    },
  }))
);
