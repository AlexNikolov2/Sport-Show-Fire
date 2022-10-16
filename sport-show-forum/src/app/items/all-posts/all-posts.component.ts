import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any;

  constructor(public router: Router, public postService: PostService, 
    public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.posts = this.postService.getPosts();
  }

}