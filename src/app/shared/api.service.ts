import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://fakestoreapi.com/products/'

  constructor(private http : HttpClient) { }

  getDetails(){
    return this.http.get<any>(this.API_URL)
    pipe(map((res:any)=>{
      return res;
    }))
  }

}
