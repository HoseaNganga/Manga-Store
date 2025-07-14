import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  SectionHeaderComponent,
  SectionLoaderComponent,
  UiCarouselComponent,
} from '@mangamarket/manga-market-sharedLib';
import { ProductStore } from '../../../stores/product.store';

@Component({
  selector: 'app-featured-flex-bar',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    SectionHeaderComponent,
    UiCarouselComponent,
    SectionLoaderComponent,
  ],
  templateUrl: './featured-flex-bar.component.html',
  styleUrl: './featured-flex-bar.component.scss',
})
export class FeaturedFlexBarComponent {
  private readonly productStore = inject(ProductStore);

  readonly topNewArrivals = computed(() => this.productStore.newArrivals());
  readonly loading = computed(
    () =>
      this.productStore.loadingNewArrivals() &&
      this.productStore.hasFetchedNewArrivals()
  );
}
