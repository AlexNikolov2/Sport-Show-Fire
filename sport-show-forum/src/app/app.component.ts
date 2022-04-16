import { Component } from '@angular/core';
import { Post } from './shared/interface/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sport-show-forum';
  posts: Post[] = [];

}
