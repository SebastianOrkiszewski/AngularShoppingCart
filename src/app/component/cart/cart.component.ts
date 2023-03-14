import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { DarkModeService } from 'src/app/shared/dark-mode.service';
import { CartService } from 'src/app/shared/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  public products: any = []
  public grandTotal !: number


currentDarkModeState: boolean = false

constructor(private api : ApiService, private DarkModeService : DarkModeService, private CartService: CartService){}
ngOnInit(): void {
  this.DarkModeService.status.subscribe((data) => {
    this.currentDarkModeState = data;
  })

  this.CartService.getArticles()
  .subscribe(res=>{
    this.products = res
    this.grandTotal = this.CartService.getGrandTotal();
  })
}
}
