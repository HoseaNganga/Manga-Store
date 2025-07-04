import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { HomecategoriesComponent } from '../homecategories/homecategories.component';
import { FeaturedFlexBarComponent } from '../featured-flex-bar/featured-flex-bar.component';
import { FeaturedComponent } from '../featured/featured.component';
import { AnimateOnScroll } from 'primeng/animateonscroll';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    HomecategoriesComponent,
    FeaturedFlexBarComponent,
    FeaturedComponent,
    AnimateOnScroll,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
