import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { DarkModeService } from 'src/app/shared/dark-mode.service';
import { CartService } from 'src/app/shared/cart.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit{

  public articlesList: any
  currentDarkModeState: boolean = false
  
  constructor(private api : ApiService, private DarkModeService : DarkModeService, private CartService: CartService) {}
  
  ngOnInit(): void {
    this.api.getDetails()
    .subscribe(res=>{
      this.articlesList = res;
      this.articlesList.forEach((a: any) => {
        Object.assign(a,{quantity:0,total:a.price,sum:a.price});
      })
    })
  
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    })
  
    console.log(this.articlesList)
  
   
  
  }
  
  addArticleToCart(item: any){
    this.CartService.addArticleToCart(item)
  }

  
  
  
  
  }

