import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: any = [];
  public articleList = new BehaviorSubject<any>([]);

  constructor() {}

  getArticles() {
    return this.articleList.asObservable();
  }

  setArticles(item: any) {
    this.cartItems.push(...item);
    this.articleList.next(item);
  }

  addArticleToCart(item: any) {
    this.cartItems.push(item);
    this.articleList.next(this.cartItems);
    this.getGrandTotal();
    item.quantity += 1;
    if (item.quantity > 1) {
      item.sum = item.price + item.sum;
    }
    console.log(this.articleList)
  }

  getGrandTotal(): number {
    let grandTotal = 0;
    this.cartItems.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  addItemInCart(item: any) {
    this.cartItems.push(item);
    this.articleList.next(this.cartItems);
    item.quantity = item.quantity + 1;
    item.sum = item.price + item.sum;
  }

  removeItemInCart(item: any) {
    
    item.quantity -= 1;
    item.sum = item.sum - item.price;
    let x = this.cartItems.findIndex((obj: any) => item.id == obj.id);
    if (x > -2) {
      this.cartItems.splice(x, 1);
    }
    this.articleList.next(this.cartItems);
    return this.cartItems;
  }

  removeCartItem(item: any) {
    this.cartItems.map((a: any, index: any) => {
      if (item.id == a.id) {
        this.cartItems.splice(index, item.quantity);
      }
    });
    this.articleList.next(this.cartItems);
  }

  removeAllCart() {
    this.cartItems = [];
    this.articleList.next(this.cartItems);
  }
}
