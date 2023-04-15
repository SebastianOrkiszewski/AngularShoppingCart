import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://fakestoreapi.com/products'
 
  constructor(private http : HttpClient) { }

  getDetails(){
    return this.http.get<Array<Product>>(this.API_URL)
    .pipe(map((res)=>{
      return res
    }))
    
    
  }

}
