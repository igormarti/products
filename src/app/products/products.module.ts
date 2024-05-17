import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { RouterModule } from '@angular/router';
import { routes } from './products-routing';
import { ProductsSuggestedComponent } from '../components/remote/products-suggested/products-suggested.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    ProductsSuggestedComponent
  ]
})
export class ProductsModule { }
