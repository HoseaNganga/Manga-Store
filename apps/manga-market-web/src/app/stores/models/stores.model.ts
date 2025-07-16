import { Genre, heroUrl, Product } from '@prisma/client';
import { gql } from 'apollo-angular';


export interface PaginatedProductData {
  results: Product[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface ProductState {
  products: PaginatedProductData;
  featuredProducts: PaginatedProductData;
  trendingProducts: PaginatedProductData;
  newArrivals: PaginatedProductData;
  topRatedProducts: PaginatedProductData;
  loading: boolean;
  error: string | null;
  loadingFeatured: boolean;
  loadingTrending: boolean;
  loadingNewArrivals: boolean;
  loadingTopRated: boolean;
}

export interface HeroState {
  heros: heroUrl[];
  loading: boolean;
  error: string | null;
}

export interface GenreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export interface SearchState {
  results: PaginatedProductData;
  loading: boolean;
  error: string | null;
}

export const GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int!
    $limit: Int!
    $featured: Boolean
    $trending: Boolean
    $isNew: Boolean
    $minRating: Float
  ) {
    products(
      page: $page
      limit: $limit
      featured: $featured
      trending: $trending
      isNew: $isNew
      minRating: $minRating
    ) {
      results {
        id
        title
        author
        genres {
          id
          name
        }
        description
        price
        stock
        coverUrl
        images
        rating
        releaseDate
        featured
        trending
        isNew
        stripePriceId
        createdAt
        updatedAt
      }
      totalCount
      currentPage
      totalPages
    }
  }
`;

export const GET_HEROURLS = gql`
  query GetHeros {
    heros {
      id
      url
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($term: String!, $page: Int!, $limit: Int!) {
    searchProducts(term: $term, page: $page, limit: $limit) {
      results {
        id
        title
        author
        description
        price
        stock
        coverUrl
        images
        rating
        releaseDate
        featured
        trending
        isNew
        stripePriceId
        createdAt
        updatedAt
        genres {
          id
          name
        }
      }
      totalCount
      currentPage
      totalPages
    }
  }
`;
