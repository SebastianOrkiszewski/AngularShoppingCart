import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/share/services/api.service';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';
import { CartService } from 'src/app/share/services/cart.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass'],
})
export class ArticlesComponent implements OnInit {
  public articlesList: any;
  public filterBy: string = '';
  public filterArticles: any;
  public currentDarkModeState: boolean = false;
  

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
      this.filterArticles = res;
      this.articlesList.forEach((a: any) => {
        if (
          a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = 'clothes';
        }
        Object.assign(a, { quantity: 0, total: a.price, sum: a.price });
      });
    });

    this.CartService.search.subscribe((value) => {
      this.filterBy = value;
    });

    this.getDarkModeStorage();
    this.CartService.search.next('');
  }

  addArticleToCart(item: any) {
    this.CartService.addArticleToCart(item);
    console.log(this.articlesList);
  }

  getDarkModeStorage() {
    let data: any = localStorage.getItem('currentDarkModeState');
    this.currentDarkModeState = JSON.parse(data);
  }

  filterCategory(category: string) {
    this.CartService.search.next('');
    this.filterArticles = this.articlesList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }



}
