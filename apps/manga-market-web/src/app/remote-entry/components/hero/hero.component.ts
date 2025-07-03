import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselComponent } from '@mangamarket/manga-market-sharedLib';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, UiCarouselComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
