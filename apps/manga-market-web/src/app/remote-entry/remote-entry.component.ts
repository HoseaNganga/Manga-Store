import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-remote-entry',
  imports: [CommonModule, RouterModule],
  templateUrl: './remote-entry.component.html',
  styleUrl: './remote-entry.component.scss',
})
export class RemoteEntryComponent implements OnInit {
  private readonly primeng = inject(PrimeNG);

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
