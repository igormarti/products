import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { routes } from './products-routing';
import { ProductsSuggestedComponent } from '../components/remote/products-suggested/products-suggested.component';




@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent
  ],
  imports: [
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    ProductsSuggestedComponent
  ]
})
export class ProductsModule { }
