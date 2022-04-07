import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';

type postObservable = Observable<any[]>;
@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts?: postObservable;

  constructor(public firestore: AngularFirestore, public router: Router, public route: ActivatedRoute, public database: AngularFireDatabase) {
   }

  getPosts() {
    this.posts = this.firestore.collection('Posts').snapshotChanges();
    return this.posts;
  }

  getPost(id: string) {
    return this.firestore.collection('Posts').doc(id).snapshotChanges();
  }

  createPost(post: {keyword: string, title: string, description: string, image: string, user?: string | null}) {
    this.firestore.collection('Posts').add(post);
  }

  update(id: string | undefined, changes: {}) {
    if (id) {
      this.firestore.collection('Posts').doc(id).update(changes).then(() => {
        this.router.navigate([`posts/${id}`]);
      });
    }
  }

  delete(id: string) {
    this.firestore.collection('Posts').doc(id).delete();
  }

  //may be implemented in search functionality if I have some time left.
  getPostByKeyword(keyword: string) {
    return this.firestore.collection('Posts', ref => ref.where('keyword', '==', keyword)).snapshotChanges();
  }

  comment(id: string, comment: {comment: string, user: string}) {
    this.firestore.collection('Posts').doc(id).collection('Comments').add(comment);
  }

  getComments(id: string) {
    return this.firestore.collection('Posts').doc(id).collection('Comments').snapshotChanges();
  }

  like(id: string, like: {user: string}) {
    this.firestore.collection('Posts').doc(id).collection('Likes').add(like);
  }

  getLikes(id: string) {
    return this.firestore.collection('Posts').doc(id).collection('Likes').snapshotChanges();
  }


}
