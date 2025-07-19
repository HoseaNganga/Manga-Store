import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-section-header',
  imports: [CommonModule, ButtonModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() category!: string;
  private readonly router = inject(Router);

  navigateToCategory() {
    this.router.navigate([`/manga/category`, this.category]);
  }
}
