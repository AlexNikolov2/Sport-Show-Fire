import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!: User;
  uid: any;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    public afs: AngularFirestore,
  ){
  }

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
      .then((data) => {
        onAuthStateChanged(auth, (user) => {
        this.uid = null;
        this.router.navigate(['/login']);
      })
      })
      .catch(err => {
        this.displayError(err.message);
      });
  }

  register(email: string, password: string, repeatPassword: string, username: string, avatar: string, description: string): void {
    const auth = getAuth();
    if(password == repeatPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          this.uid = data.user.uid;
          this.insertUserData(data);
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.displayError(err.message);
        });
    }
    /*createUserWithEmailAndPassword(auth ,email, password)
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
            updateProfile(user, {
              displayName: username + '\n' + description,
              photoURL: avatar
            })
           this.router.navigate(['/items/all-posts']);
        }
      })
    })
      .catch(err => {
        this.displayError(err.message);
      });*/
  }

  isLoggedIn(): boolean {
    return this.uid != null;;
  }

  insertUserData(data: UserCredential) {
    return this.db.doc(`Users/${data.user.uid}`).set({
      username: this.user!.username,
      email: this.user!.email,
      avatar: this.user!.avatar,
      description: this.user!.description,
      posts: this.user!.posts,
    })
  }
}
