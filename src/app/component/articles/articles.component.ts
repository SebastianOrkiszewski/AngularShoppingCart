import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/share/services/api.service';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';
import { CartService } from 'src/app/share/services/cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass'],
})
export class ArticlesComponent implements OnInit {
  articlesList: Array<Product> = []
  filterBy: string = '';
  filterArticles: Array<Product> = []
  currentDarkModeState: boolean = false;
  

  constructor(
    private ApiService: ApiService,
    private DarkModeService: DarkModeService,
    private CartService: CartService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });
    
    this.ApiService.getDetails().subscribe((res) => {
      this.articlesList = res;
      this.filterArticles = res;
      this.articlesList.forEach((product: Product) => {
        if (
          product.category === "women's clothing" || product.category === "men's clothing") {
          product.category = 'clothes';
        }
        Object.assign(product, { quantity: 0, total: product.price, sum: 0 });
      });
    });

    this.CartService.search.subscribe((value) => {
      this.filterBy = value;
    });

    this.getDarkModeStorage();
    this.CartService.search.next('');
  }

  addArticleToCart(item: Product) {
    this.CartService.addArticleToCart(item);
    console.log(item);
  }

  

  getDarkModeStorage() {
    let data: any = localStorage.getItem('currentDarkModeState');
    this.currentDarkModeState = JSON.parse(data);
  }

  filterCategory(category: string) {
    this.CartService.search.next('');
    this.filterArticles = this.articlesList.filter((product: any) => {
      if (product.category == category || category == '') {
        return product;
      }
    });
  }



}
