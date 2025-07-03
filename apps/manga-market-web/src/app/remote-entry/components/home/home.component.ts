import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../global/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, HeroComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
