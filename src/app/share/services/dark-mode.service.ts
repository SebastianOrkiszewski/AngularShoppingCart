import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private DarkModeState = new Subject<boolean>()
  status = this.DarkModeState.asObservable()

  constructor() { }

  changeDarkModeState(value:boolean){
    this.DarkModeState.next(value) 
  }
}
