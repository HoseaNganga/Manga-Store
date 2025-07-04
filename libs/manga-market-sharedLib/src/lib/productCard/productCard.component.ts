import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import * as productModel from './model/product.model';

@Component({
  selector: 'lib-product-card',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    RippleModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './productCard.component.html',
  styleUrl: './productCard.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: productModel.ProductCard;
  readonly stockInfo = computed((): productModel.StockBadgeInfo => {
    const stock = this.product.stock;
    if (stock > 0) {
      return { label: 'In Stock', severity: 'success', class: 'badge-instock' };
    } else {
      return {
        label: 'Out of Stock',
        severity: 'danger',
        class: 'badge-outstock',
      };
    }
  });
  addToCart(product: productModel.ProductCard): void {
    console.log(`Add to cart: ${product.title}`);
  }

  toggleWishlist(product: productModel.ProductCard): void {
    console.log(`Toggle wishlist for: ${product.title}`);
  }
}
