import { Genre, heroUrl, Product } from '@prisma/client';
import { gql } from 'apollo-angular';

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
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
  query GetProducts {
    products {
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
