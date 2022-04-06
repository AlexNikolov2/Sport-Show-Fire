import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null | undefined = undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth
  ){ }

  displayError(err: string): void {
    document.querySelector('.me p')!.innerHTML = err;
    setTimeout(() => {
      document.querySelector('.me p')!.innerHTML = '';
    }, 5000);
  }

  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.displayError(err.message);
      });
  }

  logout(): void {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.displayError(err.message);
      });
  }

  register(email: string, password: string, username: string, avatar: string, description: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.user = {
          email,
          password,
          username,
          avatar,
          description
        };
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.displayError(err.message);
      });
  }

}
