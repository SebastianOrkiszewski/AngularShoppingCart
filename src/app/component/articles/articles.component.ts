import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass'],
})
export class ArticlesComponent implements OnInit {
  public articlesList: any = [];
  currentDarkModeState: boolean = false;

  constructor(
    private api: ApiService,
    private DarkModeService: DarkModeService,
    private CartService: CartService
  ) {}

  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });

    this.api.getDetails().subscribe((res) => {
      this.articlesList = res;
      this.articlesList.forEach((a: any) => {
        Object.assign(a, { quantity: 0, total: a.price, sum: a.price });
      });
    });

    this.getDarkModeStorage();
  }

  addArticleToCart(item: any) {
    this.CartService.addArticleToCart(item);
  }

  getDarkModeStorage() {
    let data: any = localStorage.getItem('currentDarkModeState');
    this.currentDarkModeState = JSON.parse(data);
  }
}
