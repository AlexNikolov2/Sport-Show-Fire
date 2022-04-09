import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/shared/interface/post';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Observable<any[]> | undefined;

  constructor(public router: Router, public postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts() {
    this.posts = this.postService.getPosts();
  }

}