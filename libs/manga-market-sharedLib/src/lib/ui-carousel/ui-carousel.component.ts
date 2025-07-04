import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductCardComponent } from '../productCard/productCard.component';

@Component({
  selector: 'lib-ui-carousel',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule,ProductCardComponent],
  templateUrl: './ui-carousel.component.html',
  styleUrl: './ui-carousel.component.scss',
})
export class UiCarouselComponent {
  @Input() items: any[] = [];
  @Input() numVisible = 1;
  @Input() numScroll = 1;
  @Input() templateType: 'hero' | 'product' | 'category' = 'hero';
  @Input() responsiveOptions: any[] | null = null;

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
}
