import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared/dark-mode.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

currentDarkModeState: boolean = false

constructor(private DarkModeService : DarkModeService){}
ngOnInit(): void {
  this.DarkModeService.status.subscribe((data) => {
    this.currentDarkModeState = data;
  })
}
}
