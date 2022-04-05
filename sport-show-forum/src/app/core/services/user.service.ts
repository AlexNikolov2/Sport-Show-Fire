import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/user';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged  
} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null | undefined = undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(
    public router: Router
  ) { }

  displayError(err: string): void {
    document.querySelector('.me p')!.innerHTML = err;
    setTimeout(() => {
      document.querySelector('.me p')!.innerHTML = '';
    }, 5000);
  }
}
