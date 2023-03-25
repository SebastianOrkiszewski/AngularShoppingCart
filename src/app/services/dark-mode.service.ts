import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private DarkModeState = new Subject<boolean>()
  status = this.DarkModeState.asObservable()

  constructor() { }

  changeDarkModeState(xxx:boolean){
    this.DarkModeState.next(xxx) 
  }
}
