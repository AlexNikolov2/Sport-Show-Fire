import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  
   getPosts(): postObservable | undefined {
    this.posts = this.firestore.collection('Posts').valueChanges();
 
     this.firestore.collection('posts').get({}).subscribe(posts => {
       posts.docs.map(doc => this.postIds?.push(doc.id));
     });
     return this.posts;
  }

  getAllPostIds() {
    return this.postIds;
  }

  getSinglePost(id: string) {
    return this.firestore.collection('posts').doc<object>(id).get();
  }

  createPost(keyword: string, title: string, description: string, image: string) {
    const post: Post = {
      keyword: keyword,
      title: title,
      description: description,
      image: image,
      likes: [],
      comments: [],
      userId: this.userService.getUserId(),
    };
    let postId = this.firestore.createId();
    this.firestore.collection('Posts').doc(postId).set(post);
  }

  update(id: string | undefined, changes: {}) {
    if (id) {
      this.firestore.collection('Posts').doc(id).update(changes).then(() => {
        this.router.navigate([`posts/${id}`]);
      });
    }
  }

  delete(id?: string) {
    this.firestore.collection('Posts').doc(id).delete().then(() => this.router.navigate([`all-posts`]));
  };

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
