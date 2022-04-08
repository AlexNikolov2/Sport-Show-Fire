import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  post?: Post;
  postId?: string;
  currUser?: string | null;
  postLikes = [];
  comments$!: any[];

  constructor(
    public postService: PostService,
    public route: ActivatedRoute, 
    public router: Router, 
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.postService.getSinglePost(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.post = data.data();
      })
  }

  navigateToPostEdit() {
    this.router.navigate([`/edit/${this.postId}`])
  }

  deletePost() {
    alert('Are you sure you want to delete this post?')
    this.postService.delete(this.postId);
    this.router.navigate(['/all-posts']);
  }
}
