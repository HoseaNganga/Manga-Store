import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { HomecategoriesComponent } from '../homecategories/homecategories.component';
import { FeaturedFlexBarComponent } from '../featured-flex-bar/featured-flex-bar.component';
import { FeaturedComponent } from '../featured/featured.component';
import { GenreStore } from '../../../stores/genre.store';
import { ProductStore } from '../../../stores/product.store';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    HomecategoriesComponent,
    FeaturedFlexBarComponent,
    FeaturedComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('categorySection') categoryRef!: ElementRef;
  @ViewChild('flexBarSection') flexBarRef!: ElementRef;
  @ViewChild('featuredSection') featuredRef!: ElementRef;

  private readonly genreStore = inject(GenreStore);
  private readonly productStore = inject(ProductStore);

  ngAfterViewInit(): void {
    this.observeSection(this.categoryRef, () => {
      this.genreStore.loadGenres();
    });
    this.observeSection(this.flexBarRef, () => {
      this.productStore.loadNewArrivals();
    });
    this.observeSection(this.featuredRef, () => {
      this.productStore.loadTopRatedProducts();
      this.productStore.loadTrendingProducts();
      this.productStore.loadFeaturedProducts();
    });
  }

  private observeSection(ref: ElementRef, callback: () => void) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('🟢 Triggering fetch for:', ref.nativeElement);
          callback();
          observer.unobserve(ref.nativeElement);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.nativeElement);
  }
}
