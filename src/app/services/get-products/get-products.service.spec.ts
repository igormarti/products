import { TestBed } from '@angular/core/testing';

import { GetProductsService } from './get-products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetProductsService', () => {
  let service: GetProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(GetProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
