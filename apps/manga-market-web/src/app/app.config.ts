import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { remoteRoutes } from './remote-entry/entry.route';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/cache';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(remoteRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
        cache: new InMemoryCache(),
      };
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
};
