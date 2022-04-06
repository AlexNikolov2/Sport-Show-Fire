import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interface/post';
import { User } from 'src/app/shared/interface/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null | undefined;
  posts: Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
