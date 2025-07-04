import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { HeroStore } from '../../../../stores/hero.store';
import { GenreStore } from '../../../../stores/genre.store';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, NgxSpinnerModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LayoutComponent {
  private readonly _ngxSpinnerService = inject(NgxSpinnerService);
  private readonly _routerService = inject(Router);
  private readonly heroStore = inject(HeroStore);
  private readonly genreStore = inject(GenreStore);

  constructor() {
    effect(() => {
      if (this.heroStore.loading() || this.genreStore.loading()) {
        this._ngxSpinnerService.show();
      } else {
        this._ngxSpinnerService.hide();
      }
    });
  }

  ngOnInit(): void {
    this._routerService.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
