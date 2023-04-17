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
  firebaseError!: boolean;
  currentDarkModeState: boolean = false;

  constructor(private authService: AuthService, private DarkModeService: DarkModeService,) {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });


  }

  ngOnInit(): void {
    this.DarkModeService.status.subscribe((data) => {
      this.currentDarkModeState = data;
    });

    this.authService.errorStatus.subscribe((data) =>{
      this.firebaseError = data
    })

      
    this.getDarkModeStorage()
  }

  getDarkModeStorage(){
    let data: any = localStorage.getItem('currentDarkModeState')
    this.currentDarkModeState = JSON.parse(data)
    
  }

  loginUser() {
      if (this.loginForm.invalid)
          return;
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
  }
}