import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean;
  firebaseError = new Subject<boolean>();
  errorStatus = this.firebaseError.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.router.navigate(['/articles']);
        this.firebaseError.next(false);
      })
      .catch(() => {
        this.firebaseError.next(true);
        console.log('Incorrect email or password.');
      });
  }
}
