import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'lib-section-loader',
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './section-loader.component.html',
  styleUrl: './section-loader.component.scss',
})
export class SectionLoaderComponent implements OnInit, OnDestroy {
  private readonly spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.spinner.show();
  }

  ngOnDestroy(): void {
    this.spinner.hide();
  }
}
