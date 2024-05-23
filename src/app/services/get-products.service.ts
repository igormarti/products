import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private http: HttpClient) { }

  public execute():Observable<Array<Product>>{
      return this.http.get<Array<Product>>(environment.baseUrl+'products')
  }
}
