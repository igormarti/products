import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSuggestedComponent } from './products-suggested.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('ProductsSuggestedComponent', () => {
  let component: ProductsSuggestedComponent;
  let fixture: ComponentFixture<ProductsSuggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Adicione aqui
      imports: [CommonModule],
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
