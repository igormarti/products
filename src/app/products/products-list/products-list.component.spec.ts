import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsListComponent } from './products-list.component';
import { GetProductsService } from '../../services/get-products/get-products.service';
import { StorageService } from '../../services/storage/storage.service';
import { Product } from '../../models/product.model';
import { ProductInterested } from '../../models/product-interested.model';
import PubSub from 'pubsub-js';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsSuggestedComponent } from '../../components/remote/products-suggested/products-suggested.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let getProductsService: GetProductsService;
  let storageService: StorageService<Product>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [HttpClientTestingModule, 
        ProductsSuggestedComponent,
        MatIconModule,
        MatTooltipModule,
        CommonModule
      ],
      providers: [
        GetProductsService,
        StorageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    getProductsService = TestBed.inject(GetProductsService);
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    PubSub.clearAllSubscriptions();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products successfully', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' },
      { id: 2, name: 'Product 2' , description: 'Product 2 desc', image: 'jkjkjkj', price: '350.00' },
    ];

    const mockProductsInterested: ProductInterested[] = [
      { ...mockProducts[0], isCart: false, isFavorite: false },
      { ...mockProducts[1], isCart: false, isFavorite: false },
    ];

    spyOn(getProductsService, 'execute').and.returnValue(of(mockProducts));
    spyOn(storageService, 'get').and.returnValue([]);

    component.loadingProducts();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(mockProductsInterested);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error while loading products', async () => {
    const errorMessage = 'Error retrieving products';

    spyOn(getProductsService, 'execute').and.returnValue(throwError(errorMessage));
    spyOn(console, 'error');

    component.loadingProducts();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Error retrieving products:', errorMessage);
    expect(component.isLoading).toBe(false);
  });

  it('should add product to cart', () => {
    const mockProduct: Product =  { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' };
    const mockProductInterested: ProductInterested = { ...mockProduct, isCart: true, isFavorite: false };

    spyOn(storageService, 'set');
    spyOn(component.products, 'find').and.returnValue(mockProductInterested);

    component.addToCart(mockProduct);

    expect(storageService.set).toHaveBeenCalledWith('cart', mockProduct);
    expect(mockProductInterested.isCart).toBe(true);
  });

  it('should add product to favorite', () => {
    const mockProduct: Product =  { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' };
    const mockProductInterested: ProductInterested = { ...mockProduct, isCart: false, isFavorite: true };

    spyOn(storageService, 'set');
    spyOn(component.products, 'find').and.returnValue(mockProductInterested);

    component.addToFavorite(mockProduct);

    expect(storageService.set).toHaveBeenCalledWith('favorities', mockProduct);
    expect(mockProductInterested.isFavorite).toBe(true);
  });

  it('should not add product to favorite', () => {
    const mockProduct: Product =  { id: 3, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00' };
    const mockProductInterested: ProductInterested = {...mockProduct, isCart: false, isFavorite: true};
    const mockProductsInterested: ProductInterested[] = [
      { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00', isCart: false, isFavorite:false },
      { id: 2, name: 'Product 2' , description: 'Product 2 desc', image: 'jkjkjkj', price: '350.00', isCart: false, isFavorite:false },
    ];

    component.products = mockProductsInterested;
    fixture.detectChanges();

    spyOn(storageService, 'set');
    spyOn(component.products, 'find').and.returnValue(undefined);
    component.addToFavorite(mockProduct);

    expect(mockProductsInterested).not.toContain(mockProductInterested);
  });

  it('should mark product as favorite if it exists in the products list', () => {
    const product: Product = { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00'};
    const productInterested: ProductInterested = {...product, isFavorite: false, isCart: false};
    component.products = [productInterested];
    spyOn(storageService, 'set');
    component.addToFavorite(product);
    expect(productInterested.isFavorite).toBe(true);
  });

  it('should not mark product as favorite if it does not exist in the products list', () => {
    const product: Product = { id: 1, name: 'Product 1', description: 'Product 1 desc', image: 'jkjkjkj', price: '100.00'};
    component.products = [];
    spyOn(storageService, 'set');
    component.addToFavorite(product);
    expect(component.products.find(p => p.id === product.id)).toBeUndefined();
  });
  
  

});
