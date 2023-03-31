import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService) {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });

      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      
  }

  loginUser() {
      if (this.loginForm.invalid)
          return;
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
  }
}