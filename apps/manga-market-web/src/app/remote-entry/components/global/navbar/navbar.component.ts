import { Component, inject, OnDestroy, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { navLinks } from './module/navbar.module';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { query, showSearch } from '../../../../stores/index';
import { toObservable } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  protected searchSubscription: Subscription | null = null;
  private readonly router = inject(Router);

  items: MenuItem[] = navLinks;
  showSearch: WritableSignal<boolean> = showSearch;
  query: WritableSignal<string> = query;

  constructor() {
    this.searchSubscription = toObservable(query)
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((val) => val.trim().length > 0)
      )
      .subscribe((term) => {
        this.router.navigate(['/search'], {
          queryParams: { query: term.trim() },
        });
      });
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.updateQuery(inputElement.value);
  }

  toggleSearch() {
    if (showSearch() === true) {
      showSearch.set(false);
    } else {
      showSearch.set(true);
    }
  }

  updateQuery(value: string) {
    query.set(value);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}

/*  constructor() {
    effect(() => {
      const value = query();
      if (value.trim()) {
        this.router.navigate(['/search'], {
          queryParams: { query: value.trim() },
        });
      }
    });
  } */

/*  handleSubmit(event: Event) {
    event.preventDefault();
    const trimmed = query().trim();
    if (trimmed) {
      this.router.navigate(['/search'], {
        queryParams: { query: trimmed },
      });
    }
  } */
