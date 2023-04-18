import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseError!: boolean;
  currentDarkModeState: boolean = false;

  constructor(private authService: AuthService, private DarkModeService: DarkModeService,) {
    this.loginForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email,Validators.minLength(0)]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
}

  ngOnInit(): void {
    this.subscribeDarkModeService();

    this.subscribeAuthService();

    this.getDarkModeStorage();
  }

  subscribeDarkModeService() {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });
  }

  subscribeAuthService() {
    this.authService.errorStatus.subscribe((data) => {
      this.firebaseError = data;
    });
  }

  getDarkModeStorage() {
    let data: any = localStorage.getItem('currentDarkModeState');
    this.currentDarkModeState = JSON.parse(data);
  }

  loginUser() {
    if (this.loginForm.invalid) return;
    this.authService.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

}
