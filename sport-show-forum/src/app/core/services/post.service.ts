import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interface/post';
import { User } from 'src/app/shared/interface/user';
import { UserService } from '../services/user.service';
import firestore from 'firebase/compat';
import { arrayUnion } from '@angular/fire/firestore';
import {Comment} from '../../shared/interface/comment';

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

  getPostById(id: string) {
    return this.firestore.collection('Posts').doc(id).valueChanges();
  }

  createPost(keyword: string, title: string, image: string, description: string) {
    const post: Post = {
      id: '',
      keyword: keyword,
      title: title,
      image: image,
      description: description,
      likes: [],
      comments: [],
      userId: this.userService.getUserId(),
      created_at: Date.now(),
      user: this.userService.getUserEmail()
    };
    post.id = this.firestore.createId();
    this.firestore.collection('Posts').doc(post.id).set(post);
  }

 update(post: any, postId: string){
    this.firestore.collection('Posts').doc(postId).set(post);
  }

  delete(id?: string) {
    this.firestore.collection('Posts').doc(id).delete().then(() => this.router.navigate([`/all-posts`]));
  };

  //may be implemented in search functionality if I have some time left.
  getPostByKeyword(keyword: string) {
    return this.firestore.collection('Posts', ref => ref.where('keyword', '==', keyword)).snapshotChanges();
  }

  likePost(id: string) {
    this.firestore.collection('Posts').doc(id).update({
      likes: arrayUnion(this.userService.getUserId())
    });
  }

  commentPost(id: string, content: string) {
    const comment: Comment = {
      id: '',
      content: content,
      userId: this.userService.getUserId(),
      created_at: Date.now(),
      user: this.userService.getUserEmail()
    };
    comment.id = this.firestore.createId();
    this.firestore.collection('Posts').doc(id).update({
      comments: arrayUnion(comment)
    });
  }

  searchPosts(keyword: string) {
    return this.firestore.collection('Posts', ref => ref.where('keyword', '==', keyword)).snapshotChanges();
  }
}