import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';
import { CartService } from 'src/app/share/services/cart.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  products: Array<Product> = [];
  grandTotal: number = 0;
  currentDarkModeState: boolean = false;
  cartState: boolean = false;

  constructor(private DarkModeService: DarkModeService,private CartService: CartService) {}
  
  ngOnInit(): void {
    this.subscribeDarkModeService();

    this.subscribeShowCartState();

    this.subscribeGetArticles();

    this.getDarkModeStorage();
  }

  subscribeDarkModeService() {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });
  }

  subscribeShowCartState() {
    this.CartService.showCartState.subscribe((data) => {
      this.cartState = data;
    });
  }

  subscribeGetArticles() {
    this.CartService.getArticles().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.CartService.getGrandTotal();
    });
  }

  addItemInCart(item: Product) {
    this.CartService.addItemInCart(item);
  }

  removeItemInCart(item: Product) {
    if (item.quantity > 1) {
      this.CartService.removeItemInCart(item);
    }
  }

  removeCartItem(item: Product) {
    this.CartService.removeCartItem(item);
  }

  removeAllCart() {
    this.CartService.removeAllCart();
  }

  getDarkModeStorage() {
    let data: any = localStorage.getItem('currentDarkModeState');
    this.currentDarkModeState = JSON.parse(data);
  }

  switchCartState() {
    if (this.cartState == true) {
      this.CartService.changeShowCart(false);
    } else {
      this.CartService.changeShowCart(true);
    }
  }
}
