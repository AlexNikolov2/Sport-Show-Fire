import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/shared/interface/post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts?: Post[];

  constructor(public router: Router, public postService: PostService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  onClick(post: Post) {
    this.router.navigate(['/post', post.id]);
  }

  retrievePosts(): void {
    this.postService.getPosts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
    });
  }

}
