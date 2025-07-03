import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaMarketSharedLibComponent } from './manga-market-sharedLib.component';

describe('MangaMarketSharedLibComponent', () => {
  let component: MangaMarketSharedLibComponent;
  let fixture: ComponentFixture<MangaMarketSharedLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaMarketSharedLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaMarketSharedLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
