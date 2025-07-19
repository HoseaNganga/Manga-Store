import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GenreState, GET_GENRES } from './models/stores.model';
import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Genre } from '@prisma/client';
import { tap } from 'rxjs';

const initialState: GenreState = {
  genres: [],
  loading: false,
  error: null,
};

export const GenreStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadGenres() {
      patchState(store, { loading: true });
      apollo
        .watchQuery<{ genres: Genre[] }>({
          query: GET_GENRES,
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) => {
              const uniqueGenres = removeDuplicateGenres(data.genres).sort(
                (a, b) => a.name.localeCompare(b.name)
              );
              patchState(store, { genres: uniqueGenres, loading: false });
            },

            error: (error) =>
              patchState(store, { error: error.message, loading: false }),
          })
        )
        .subscribe();
    },
  }))
);

function removeDuplicateGenres(genres: Genre[]): Genre[] {
  const seen = new Set();
  return genres.filter((genre) => {
    const key = genre.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
