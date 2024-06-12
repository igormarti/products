import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { Product } from '../../models/product.model';

describe('StorageService', () => {
  let service: StorageService<Product>;
  let mockStorage: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    mockStorage = (function() {
      let store:any = {};
      return {
        getItem: function(key:string) {
          return store[key];
        },
        setItem: function(key:string, value:string) {
          store[key] = value.toString();
        },
        clear: function() {
          store = null;
        },
        removeItem: function(key:string) {
          delete store[key];
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', { 
      value: mockStorage,
    });

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getItem should be called and return value', () => {

    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' },
      { id: 2, name: 'Product 2' , description: 'Product 2 desc', image: 'jkjkjkj', price: '350.00' },
    ];

    const spyGetItem = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockProducts));
    const resultado = service.get('getItem');

    expect(resultado).toEqual(mockProducts);
    expect(spyGetItem).toHaveBeenCalled();
    expect(spyGetItem).toHaveBeenCalled();
    expect(spyGetItem).toHaveBeenCalledTimes(1);
  });

  it('should be returned empty array of the storage', () => {

    const spyGetItem = spyOn(localStorage, 'getItem').and.returnValue(null);
    const resultado = service.get('getItem');

    expect(resultado).toEqual([]);
    expect(spyGetItem).toHaveBeenCalled();
    expect(spyGetItem).toHaveBeenCalled();
    expect(spyGetItem).toHaveBeenCalledTimes(1);
  });

  it('should be set data in the storage', () => {
   
    const mockProduct:Product = { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' };
    const spySetItem = spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([mockProduct]));

    service.set('products', mockProduct);
    const resultado = service.get('products');

    expect(resultado).toEqual([mockProduct]);
    expect(spySetItem).toHaveBeenCalled();
    expect(spySetItem).toHaveBeenCalled();
    expect(spySetItem).toHaveBeenCalledTimes(1);
  });

  it('should be update item in the storage', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' },
      { id: 2, name: 'Product 2' , description: 'Product 2 desc', image: 'jkjkjkj', price: '350.00' },
    ];
    const mockProduct:Product = {
      id: 1, name: 'Product 3', description: 'Product 3 desc', image: 'jkjkjkj', price: '200.00',
    };

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'products') {
        return JSON.stringify(mockProducts);
      }
      return null;
    });

    const setItemSpy = spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      if (key === 'products') {
        mockProducts.length = 0;
        mockProducts.push(...JSON.parse(value));
      }
    });


    service.put('products', (item:Product) => {
       if(item.id===1){
          item.description = mockProduct.description;
          item.name = mockProduct.name;
          item.price = mockProduct.price;
          console.log(item);
       }
    });
    const resultado = service.get('products');

    expect(resultado.find((p: Product) => p.id === 1)).toEqual(mockProduct);
    expect(setItemSpy).toHaveBeenCalledWith('products', JSON.stringify(mockProducts));
  });

  it('should be delete item in the storage', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' },
      { id: 2, name: 'Product 2' , description: 'Product 2 desc', image: 'jkjkjkj', price: '350.00' },
    ];

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'products') {
        return JSON.stringify(mockProducts);
      }
      return null;
    });

    const setItemSpy = spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      if (key === 'products') {
        mockProducts.length = 0;
        mockProducts.push(...JSON.parse(value));
      }
    });


    service.delete('products', (item:Product) => item.id!==1);
    const resultado = service.get('products');

    expect(resultado.find((p: Product) => p.id === 1)).toEqual(mockProducts[1]);
    expect(setItemSpy).toHaveBeenCalledWith('products', JSON.stringify(mockProducts));
  });

  it('should be destroy product storage', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' },
      { id: 2, name: 'Product 2' , description: 'Product 2 desc', image: 'jkjkjkj', price: '350.00' },
    ];

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'products') {
        return JSON.stringify(mockProducts);
      }
      return null;
    });

    const destroyItemSpy = spyOn(localStorage, 'removeItem').and.callFake((key) => {
      if (key === 'products') {
        mockProducts.length = 0;
        mockProducts.splice(0, mockProducts.length);
      }
    });

    service.destroy('products');
    const resultado = service.get('products');

    const resultProductStore:Array<Product> = [];
    expect(resultado).toEqual(resultProductStore);
    expect(destroyItemSpy).toHaveBeenCalledWith('products');
  });

  it('Clear should be called', () => {
    const clearSpy = spyOn(localStorage, 'clear').and.callThrough();
    service.clear();
    expect(clearSpy).toHaveBeenCalled();
  });
});

