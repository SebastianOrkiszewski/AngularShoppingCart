import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private DarkModeState = new BehaviorSubject<boolean>(false)

  constructor() { }

  changeDarkModeState(){
    this.DarkModeState.next(!this.DarkModeState.value)
  }

  receivedDarkModeState(): Observable<boolean>{
    return this.DarkModeState.asObservable()
  }
}
