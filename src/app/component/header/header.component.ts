import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';
import { CartService } from 'src/app/share/services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public counterItem!: number;
  public searchItem: string = '';
  public currentDarkModeState: boolean = false;
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
      this.counterItem = this.CartService.getQuantity();
    });

    this.getDarkModeStorage();
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

  search(event: any) {
    this.searchItem = event;
    this.CartService.search.next(this.searchItem);
    this.searchItem = '';
    console.log(this.searchItem);
  }
}
