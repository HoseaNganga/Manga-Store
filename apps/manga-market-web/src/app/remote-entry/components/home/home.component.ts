import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../global/navbar/navbar.component";
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
