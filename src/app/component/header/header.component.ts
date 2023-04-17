import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';
import { CartService } from 'src/app/share/services/cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  counterItem: number = 0;
  searchItem: string = '';
  currentDarkModeState: boolean = false;
  cartState: boolean = false;

  constructor(
    private DarkModeService: DarkModeService,private CartService: CartService,public afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.subscribeDarkModeService();

    this.subscribeShowCartState();

    this.subscribeCounterItem();

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

  subscribeCounterItem() {
    this.CartService.getArticles().subscribe((res) => {
      this.counterItem = this.CartService.getQuantity();
    });
  }

  switchDarkModeState() {
    if (this.currentDarkModeState == true) {
      this.DarkModeService.changeDarkModeState(false);
    } else {
      this.DarkModeService.changeDarkModeState(true);
    }
    localStorage.setItem('currentDarkModeState',JSON.stringify(this.currentDarkModeState));
  }

  switchCartState() {
    if (this.cartState == true) {
      this.CartService.changeShowCart(false);
    } else {
      this.CartService.changeShowCart(true);
    }
  }

  getDarkModeStorage() {
    let data: any = localStorage.getItem('currentDarkModeState');
    this.currentDarkModeState = JSON.parse(data);
  }

  search(event: string) {
    this.searchItem = event;
    this.CartService.search.next(this.searchItem);
    this.searchItem = '';
    console.log(this.searchItem);
  }

  logout(): void {
    this.afAuth.signOut();
    this.CartService.removeAllCart();
  }
}
