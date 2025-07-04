import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-featured-flex-bar',
  imports: [CommonModule, CardModule,ButtonModule],
  templateUrl: './featured-flex-bar.component.html',
  styleUrl: './featured-flex-bar.component.scss',
})
export class FeaturedFlexBarComponent {}
