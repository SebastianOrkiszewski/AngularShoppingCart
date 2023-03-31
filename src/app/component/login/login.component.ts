import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DarkModeService } from 'src/app/share/services/dark-mode.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  firebaseErrorMessage: string;
  public currentDarkModeState!: boolean;

  constructor(private authService: AuthService, private DarkModeService: DarkModeService,) {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });

      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });
      
    this.getDarkModeStorage()
  }

  getDarkModeStorage(){
    let data:any = localStorage.getItem('currentDarkModeState')
    this.currentDarkModeState = JSON.parse(data)
  }

  loginUser() {
      if (this.loginForm.invalid)
          return;
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
  }
}