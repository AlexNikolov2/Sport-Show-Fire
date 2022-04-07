import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interface/post';
import { User } from 'src/app/shared/interface/user';
import { UserService } from '../services/user.service';

type postObservable = Observable<any[]>;
@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts?: postObservable;
  postIds?: string[] = [];


  constructor(public firestore: AngularFirestore, public router: Router, public route: ActivatedRoute, public database: AngularFireDatabase
    , public userService: UserService) {
   }

}
