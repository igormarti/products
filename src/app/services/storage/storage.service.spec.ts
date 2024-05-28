import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { Product } from '../../models/product.model';

describe('StorageService', () => {
  let service: StorageService<Product>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests for the StorageService methods
});

