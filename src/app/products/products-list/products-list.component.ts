import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../services/get-products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  products:Array<Product> = []

  constructor(private getProductService:GetProductsService){}

  ngOnInit(): void {
      this.getProductService.execute().subscribe((products:Array<Product>) => {
        this.products = products;
      })
  }

}
