import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/shared/interface/post';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  constructor(public router: Router, public postService: PostService, ) { }

  ngOnInit(): void {
  }
  

}
