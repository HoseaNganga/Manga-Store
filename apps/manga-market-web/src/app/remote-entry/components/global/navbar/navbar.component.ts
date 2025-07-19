import { Component, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
//import { navLinks } from './module/navbar.module';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { query, showSearch } from '../../../../stores/index';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    Menubar,
    BadgeModule,
    InputTextModule,
    AvatarModule,
    RippleModule,
    ButtonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  /*  items: MenuItem[] = navLinks; */
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/',
    },
    {
      label: 'Manga',
      icon: 'pi pi-th-large',
      routerLink: '/mangas',
    },
  ];
  showSearch: WritableSignal<boolean> = showSearch;
  query: WritableSignal<string> = query;

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.updateQuery(inputElement.value);
    if (inputElement.value === '') {
      this.router.navigate([], {
        queryParams: { query: null },
        queryParamsHandling: 'merge',
      });
    }
  }

  toggleSearch() {
    if (showSearch() === true) {
      showSearch.set(false);
    } else {
      showSearch.set(true);
    }
  }

  onSearchSubmit(): void {
    const term = query().trim();
    if (term) {
      this.router.navigate(['/search'], {
        queryParams: { query: term },
      });
    }
  }

  updateQuery(value: string) {
    query.set(value);
  }
}
