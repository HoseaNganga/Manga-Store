import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedFlexBarComponent } from './featured-flex-bar.component';

describe('FeaturedFlexBarComponent', () => {
  let component: FeaturedFlexBarComponent;
  let fixture: ComponentFixture<FeaturedFlexBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedFlexBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedFlexBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
