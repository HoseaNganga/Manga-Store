import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import {ButtonModule} from 'primeng/button'

@Component({
  imports: [RouterModule,ButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'manga-market-web';
  private readonly primeng=inject(PrimeNG);
  ngOnInit(): void {
      this.primeng.ripple.set(true)
  }
}
