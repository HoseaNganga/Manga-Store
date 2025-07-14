import { Genre, heroUrl, Product } from '@prisma/client';
import { gql } from 'apollo-angular';

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  trendingProducts: Product[];
  newArrivals: Product[];
  topRatedProducts: Product[];
  loading: boolean;
  error: string | null;
  loadingFeatured: boolean;
  loadingTrending: boolean;
  loadingNewArrivals: boolean;
  loadingTopRated: boolean;
  hasFetchedFeatured: boolean;
  hasFetchedTrending: boolean;
  hasFetchedNewArrivals: boolean;
  hasFetchedTopRated: boolean;
}

export interface HeroState {
  heros: heroUrl[];
  loading: boolean;
  error: string | null;
}

export interface genreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export const GET_PRODUCTS = gql`
  query GetProducts(
    $featured: Boolean
    $trending: Boolean
    $isNew: Boolean
    $minRating: Float
  ) {
    products(
      featured: $featured
      trending: $trending
      isNew: $isNew
      minRating: $minRating
    ) {
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
