import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from 'src/app/shared/interface/post';
import { User } from 'src/app/shared/interface/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email?: any;
  posts: Post[] = [];
  id: any

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore, public postService: PostService) { }

  ngOnInit(): void {
    this.auth.currentUser.then(user => {
      this.email = user?.email;
    });
    this.postService.getPosts()?.subscribe(post => this.posts = post.filter(x => x.user === this.email));
  }
}
