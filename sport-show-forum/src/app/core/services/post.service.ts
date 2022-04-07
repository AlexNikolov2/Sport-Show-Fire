import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Post } from 'src/app/shared/interface/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsRef: AngularFireList<Post>;

  constructor(private db: AngularFireDatabase) {
    this.postsRef = this.db.list('/posts');
   }

  getPosts() {
    return this.postsRef;
  }

  addPost(post: Post) {
    this.postsRef.push(post);
  }

  updatePost(post: Post) {
    this.postsRef.update(post.id!, post);
  }

  removePost(post: Post) {
    this.postsRef.remove(post.id!);
  }

  getPostById(id: string) {
    return this.db.object('/posts/' + id);
  }


}
