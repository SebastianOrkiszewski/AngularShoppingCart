import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
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

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
          if (result == null) {                               
              console.log('logging in...');
              this.router.navigate(['/articles']);                
          }
          else if (result.isValid == false) {
              console.log('login error', result);
              this.firebaseErrorMessage = result.message;
          }
      });
  }
}