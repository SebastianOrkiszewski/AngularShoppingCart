import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared/dark-mode.service';
import { CartService } from 'src/app/shared/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public counterItem: number = 0;
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
      this.counterItem = res.length;
    });
  }

  switchDarkModeState() {
    this.DarkModeService.changeDarkModeState();
  }
}
