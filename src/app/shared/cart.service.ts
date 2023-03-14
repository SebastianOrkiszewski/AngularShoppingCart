import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItems: any = []
  public articleList = new BehaviorSubject<any>([])

  constructor() { }

  getArticles(){
    return this.articleList.asObservable()
  }

  setArticles(item: any){
    this.cartItems.push(...item)
    this.articleList.next(item)
  }

  addArticleToCart(item: any){
    this.cartItems.push(item)
    this.articleList.next(this.cartItems)
    this.getGrandTotal()
    console.log(this.cartItems)
  }
  getGrandTotal(): number{
    let grandTotal = 0;
    this.cartItems.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal
  }
}