import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Array<Product> = []
  articleList = new BehaviorSubject<Array<Product>>([]);
  search = new BehaviorSubject<string>('');
  showCart = new Subject<boolean>();
  showCartState = this.showCart.asObservable();

  constructor(private router:Router) {}

  getArticles() {
    return this.articleList.asObservable();
  }

  setArticles(item: Array<Product>) {
    this.cartItems.push(...item);
    this.articleList.next(item);
  }

  addArticleToCart(item: Product) {
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
    this.cartItems.map((item: Product) => {
      quantity += item.quantity;
    });

    return quantity;
  }

  addItemInCart(item: Product) {
    item.quantity++;
    item.sum = item.price + item.sum;
    this.getGrandTotal();
    this.articleList.next(this.cartItems);
  }

  removeItemInCart(item: Product) {
    item.quantity--;
    item.sum = item.sum - item.price;
    this.getGrandTotal();
    this.articleList.next(this.cartItems);
  }

  removeCartItem(item: Product) {
    this.cartItems.map((product: Product, index: number) => {
      if (item.id === product.id) {
        this.cartItems.splice(index, 1);
      }
    });
    item.quantity = 0
    this.articleList.next(this.cartItems);
  }

  removeAllCart() {
    this.cartItems = [];
    this.articleList.next(this.cartItems);
    this.router.navigate(['/**']).then(() => { this.router.navigate(['/articles']); });
  }

  getGrandTotal(): number {
    let grandTotal = 0;
    this.cartItems.map((product: Product) => {
      grandTotal += product.sum;
    });
    return grandTotal;
  }

  changeShowCart(value: boolean) {
    this.showCart.next(value);
  }
}
