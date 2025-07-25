import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCarouselComponent } from './ui-carousel.component';

describe('UiCarouselComponent', () => {
  let component: UiCarouselComponent;
  let fixture: ComponentFixture<UiCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
