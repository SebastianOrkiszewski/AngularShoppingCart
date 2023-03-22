import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared/dark-mode.service';
import { CartService } from 'src/app/shared/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  public stackProducts: any = [];
  public products: any = [];
  public grandTotal!: number;

  currentDarkModeState: boolean = false;

  constructor(
    private DarkModeService: DarkModeService,
    private CartService: CartService
  ) {}
  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });

    this.CartService.getArticles().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.CartService.getGrandTotal();
      this.stackProducts = this.products.reduce(
        (finalArray: any, current: any) => {
          let obj = finalArray.find(
            (item: any) => item.title === current.title
          );
          if (obj) {
            return finalArray;
          }
          return finalArray.concat([current]);
        },
        []
      );
    });
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
}
