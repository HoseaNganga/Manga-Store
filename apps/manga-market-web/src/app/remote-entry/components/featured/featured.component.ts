import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStore } from '../../../stores/product.store';
import { UiCarouselComponent } from '@mangamarket/manga-market-sharedLib';

@Component({
  selector: 'app-featured',
  imports: [CommonModule, UiCarouselComponent],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent implements OnInit {
  private readonly productStore = inject(ProductStore);

  ngOnInit(): void {
    this.productStore.loadProducts();
  }

  readonly myProducts = computed(() => this.productStore.products());
}
