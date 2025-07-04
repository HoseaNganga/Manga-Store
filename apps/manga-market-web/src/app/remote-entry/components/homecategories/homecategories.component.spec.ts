import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomecategoriesComponent } from './homecategories.component';

describe('HomecategoriesComponent', () => {
  let component: HomecategoriesComponent;
  let fixture: ComponentFixture<HomecategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
