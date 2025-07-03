import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ProductStore } from '../../../stores/product.store';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  /*   productStore = inject(ProductStore);

  constructor() {
    afterNextRender(() => {
      this.productStore.loadProducts();
    });
  } */
}
