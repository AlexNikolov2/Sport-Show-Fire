import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interface/post';
import { UserService } from '../services/user.service';
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

  getNoImgPosts(posts: any) {
    posts = this.firestore.collection('Posts', ref => ref.where('image', '==',  "")).valueChanges();
 
    console.log(posts);
    
    return posts;
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

  sortByDate(posts: any) {
    posts.sort((a: { created_at: number; }, b: { created_at: number; }) => {
      return b.created_at - a.created_at;
    });
  }

  
}