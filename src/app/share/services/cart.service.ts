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
    item.sum = item.price + item.sum;
    if (item.quantity === 0) {
      this.cartItems.push(item);
      item.quantity += 1;
      
    } else {
      item.quantity += 1;
    }

    this.getGrandTotal();
    this.articleList.next(this.cartItems);
    
  }

  getQuantity(): number {
    let quantity = 0;
    this.cartItems.map((item: any) => {
      quantity += item.quantity;
    });

    return quantity;
  }

  addItemInCart(item: any) {
    item.quantity++;
    item.sum = item.price + item.sum;
    this.getGrandTotal();
    this.articleList.next(this.cartItems);
  }

  removeItemInCart(item: any) {
    item.quantity--;
    item.sum = item.sum - item.price;
    this.getGrandTotal();
    this.articleList.next(this.cartItems);
  }

  removeCartItem(item: any) {
    this.cartItems.map((e: any, index: any) => {
      if (item.id === e.id) {
        this.cartItems.splice(index, 1);
      }
    });
    item.xxx = item.xxx - 1
    this.articleList.next(this.cartItems);
  }

  removeAllCart() {
    this.cartItems = [];
    this.articleList.next(this.cartItems);
    
  }

  getGrandTotal(): number {
    let grandTotal = 0;
    this.cartItems.map((a: any) => {
      grandTotal += a.sum;
    });
    return grandTotal;
  }
}
