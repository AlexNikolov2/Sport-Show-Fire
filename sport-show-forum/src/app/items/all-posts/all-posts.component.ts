import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interface/post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
