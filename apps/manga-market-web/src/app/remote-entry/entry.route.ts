import { Routes } from '@angular/router';
import { LayoutComponent } from './components/global/layout/layout.component';

export const remoteRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./components/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },
      {
        path: 'mangas',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'manga/category/:category',
        loadComponent: () =>
          import('./components/category/category.component').then(
            (m) => m.CategoryComponent
          ),
      },
    ],
  },
];
