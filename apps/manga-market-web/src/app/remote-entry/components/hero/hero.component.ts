import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselComponent } from '@mangamarket/manga-market-sharedLib';
import { HeroStore } from '../../../stores/hero.store';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, UiCarouselComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  readonly heroStore = inject(HeroStore);

  ngOnInit(): void {
    this.heroStore.loadHeros();
  }

  readonly carouselUrls = computed(() =>
    this.heroStore.heros().map((hero) => hero.url)
  );
}
