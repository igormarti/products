import {  Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';

export const routes:Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'detail/:id',
    component: ProductsDetailComponent
  }
]