import { Component, OnInit, Optional } from '@angular/core';
import { GetProductsService } from '../../services/get-products.service';
import { Product } from '../../models/product.model';
import { ProductInterested } from '../../models/product-interested.model';
import ProductCount from '../../models/product-count.model';
import PubSub from 'pubsub-js'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  products:Array<ProductInterested> = [];
  isLoading:boolean = false;

  constructor(private getProductService:GetProductsService){}

  ngOnInit(): void {
     this.loadingProducts();
  }

  loadingProducts(){
    this.isLoading = true;
    this.getProductService.execute().subscribe({
      next: async (products: Array<Product>) => {
        this.products = await this.checkProductsIsInterestToClient(products);
        this.sendMessage('product_interested',this.getCountProductsInterested('cart'));
        this.sendMessage('product_interested',this.getCountProductsInterested('favorities'));
      },
      error: (error: any) => {
        // Handle errors here
        console.error('Error retrieving products:', error); // Example usage
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  addToCart(product:Product){
    console.log(product)
    let products:Array<Product> = [];
    const hasProducts = localStorage.getItem('cart');
    if(hasProducts){
      products = JSON.parse(hasProducts);
    }
    products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
    const productFound:ProductInterested|undefined = this.products.
    find((pr:ProductInterested) => pr.id===product.id)
    if(typeof productFound !== 'undefined'){
      productFound.isCart = true;
      const productCount:ProductCount = this.getCountProductsInterested('cart');
      this.sendMessage('product_interested',productCount);
    }
  } 

  addToFavorite(product:Product){
    let products:Array<Product> = [];
    const hasProducts = localStorage.getItem('favorities');
    if(hasProducts){
      products = JSON.parse(hasProducts);
    }
    products.push(product);
    localStorage.setItem('favorities', JSON.stringify(products));
    const productFound:ProductInterested|undefined = this.products.
    find((pr:ProductInterested) => pr.id===product.id)
    if(typeof productFound !== 'undefined'){
      productFound.isFavorite = true;
      const productCount:ProductCount = this.getCountProductsInterested('favorities');
      this.sendMessage('product_interested', productCount);
    }
  }

  private async checkProductsIsInterestToClient(products:Array<Product>):Promise<ProductInterested[]>{
    let productsFavorite:[] = [];
    let productsCart:[] = [];
    const  hasProductFavorite = localStorage.getItem('favorities'); 
    const hasProductsCart = localStorage.getItem('cart');
    
    if(hasProductFavorite){
      productsFavorite = JSON.parse(hasProductFavorite);
    }
    if(hasProductsCart){
      productsCart = JSON.parse(hasProductsCart);
    }
    return products.map<ProductInterested>((product:Product):ProductInterested => {
        const isFavorite = productsFavorite.find((pf:Product) => pf.id === product.id);
        const isCart = productsCart.find((pc:Product) => pc.id === product.id);
        return {
          ...product,
          isCart:isCart?true:false,
          isFavorite:isFavorite?true:false
        }
    })
  }

  private getCountProductsInterested(topic:'cart' | 'favorities'):ProductCount{
    const type = topic==='cart'?'isCart':'isFavorite';
    return  {
      topic: topic,
      count: this.products.filter((p) => p[type as keyof ProductInterested]===true).length
    } 
  }

  private sendMessage(msg:string, data:any){
    PubSub.publish(msg, data);
  }
}
