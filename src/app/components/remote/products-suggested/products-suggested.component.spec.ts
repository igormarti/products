import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSuggestedComponent } from './products-suggested.component';

describe('ProductsSuggestedComponent', () => {
  let component: ProductsSuggestedComponent;
  let fixture: ComponentFixture<ProductsSuggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsSuggestedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
