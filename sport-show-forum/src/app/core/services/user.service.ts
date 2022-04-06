import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null | undefined = undefined;
  uid: any=null;

  

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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.displayError(err.message);
      });
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.uid = null;
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.displayError(err.message);
      });
  }

  register(email: string, password: string, username: string, avatar: string, description: string): void {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth ,email, password)
    .then(data =>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
           this.uid = user.uid;
            this.user = {
              uid: this.uid,
              username: username,
              email: email,
              avatar: avatar,
              description: description
            };
           this.router.navigate(['/items/all-posts']);
        }
      })
    })
      .catch(err => {
        this.displayError(err.message);
      });
  }

  isLoggedIn(): boolean {
    return this.uid != null;;
  }

}
