import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GET_HEROURLS, HeroState } from './models/stores.model';
import { inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { heroUrl } from '@prisma/client';
import { tap } from 'rxjs';

const initialState: HeroState = {
  heros: [],
  loading: false,
  error: null,
};

export const HeroStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, apollo = inject(Apollo)) => ({
    loadHeros() {
      patchState(store, { loading: true });
      apollo
        .watchQuery<{ heros: heroUrl[] }>({
          query: GET_HEROURLS,
        })
        .valueChanges.pipe(
          tap({
            next: ({ data }) =>
              patchState(store, { heros: data.heros, loading: false }),
            error: (error) =>
              patchState(store, { error: error.message, loading: false }),
          })
        )
        .subscribe();
    },
  }))
);
