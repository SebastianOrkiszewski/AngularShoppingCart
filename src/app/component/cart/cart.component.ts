import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';
import { CartService } from 'src/app/share/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  public currentDarkModeState!: boolean;
  public cartState: boolean = false

  constructor(
    private DarkModeService: DarkModeService,
    private CartService: CartService
  ) {}
  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });

    this.CartService.showCartState.subscribe((data) => {
      this.cartState = data;
    })

    this.CartService.getArticles().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.CartService.getGrandTotal();
    });
    this.getDarkModeStorage()
  }
  addItemInCart(item: any) {
    this.CartService.addItemInCart(item);
  }

  removeItemInCart(item: any) {
    if (item.quantity > 1) {
      this.CartService.removeItemInCart(item);
    }
  }

  removeCartItem(item: any) {
    this.CartService.removeCartItem(item);
  }

  removeAllCart() {
    this.CartService.removeAllCart();
  }

  getDarkModeStorage(){
    let data:any = localStorage.getItem('currentDarkModeState')
    this.currentDarkModeState = JSON.parse(data)
  }

  switchCartState() {
    if (this.cartState == true) {
      this.CartService.changeShowCart(false);
    } else {
      this.CartService.changeShowCart(true);
    }
  }
}
