import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
@Input() currentDarkModeState: any;

@Output() changeState = new EventEmitter<boolean>();

switchDarkModeState() {
  this.currentDarkModeState = !this.currentDarkModeState
  this.changeState.emit(this.currentDarkModeState);
}
}
