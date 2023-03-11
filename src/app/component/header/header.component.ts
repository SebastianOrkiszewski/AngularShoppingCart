import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared/dark-mode.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentDarkModeState: boolean = false

  constructor(private DarkModeService : DarkModeService){}
  
  ngOnInit(): void {
    this.DarkModeService.receivedDarkModeState().subscribe((d) => {
      this.currentDarkModeState = d;
    })
  }

  switchDarkModeState() {
    this.DarkModeService.changeDarkModeState()
  }
}
