import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductCardComponent } from '../productCard/productCard.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-ui-carousel',
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    ProductCardComponent,
    CardModule,
  ],
  templateUrl: './ui-carousel.component.html',
  styleUrl: './ui-carousel.component.scss',
})
export class UiCarouselComponent {
  @Input() items: any[] = [];
  @Input() numVisible = 1;
  @Input() numScroll = 1;
  @Input() templateType: 'hero' | 'product' | 'category'|'vertical-product' = 'hero';
  @Input() responsiveOptions: any[] | null = null;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() verticalHeight = '330px';
  @Output() categorySelected=new EventEmitter<any>();

  defaultResponsive: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

   handleCategoryClick(category: any) {
    this.categorySelected.emit(category);
  }
}
