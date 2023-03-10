import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  darkModeState: any = true

  switchDarkModeState(): void{
    this.darkModeState = !this.darkModeState
  }
}
