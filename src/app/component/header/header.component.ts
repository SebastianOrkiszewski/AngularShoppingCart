import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public counterItem!: number;
  currentDarkModeState!: boolean;

  constructor(
    private DarkModeService: DarkModeService,
    private CartService: CartService
  ) {}

  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });
    this.CartService.getArticles().subscribe((res) => {
      this.counterItem = this.CartService.getQuantity();
    });
  }

  switchDarkModeState() {
    this.DarkModeService.changeDarkModeState();
  }
}
