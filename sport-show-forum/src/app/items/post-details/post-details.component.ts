import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { get } from '@angular/fire/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from 'src/app/shared/interface/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any;
  postId!: string;
  currUser?: any;
  postLikes = [];
  comments$!: any[];

  constructor(
    public postService: PostService,
    public route: ActivatedRoute, 
    public router: Router, 
    public auth: AngularFireAuth,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.postService.getPostById(this.postId).subscribe((post: any) => {
      this.post = post;
      this.postLikes = post.likes;
      this.comments$ = post.comments;
    });
    this.auth.authState.subscribe(user => {
      this.currUser = user!.uid;
    });
  }

  navigateToPostEdit() {
    this.router.navigate([`/edit/${this.postId}`])
  }

  deletePost() {
    alert('Are you sure you want to delete this post?')
    this.postService.delete(this.postId);
    this.router.navigate(['/all-posts']);
  }

  likePost() {
    this.postService.like(this.postId, this.currUser);
  }
}
