import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'lib-section-loader',
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './section-loader.component.html',
  styleUrl: './section-loader.component.scss',
})
export class SectionLoaderComponent {}
