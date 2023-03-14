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

  removeCartItem(item: any){
    this.cartItems.map((a:any, index:any)=>{
      if(item.id==a.id){
        this.cartItems.splice(index,1)
      }
    })
    this.articleList.next(this.cartItems)
  }
  removeAllCart(){
    this.cartItems = []
    this.articleList.next(this.cartItems)
  }

}
