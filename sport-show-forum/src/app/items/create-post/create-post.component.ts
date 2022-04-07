import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  constructor(private postService: PostService, public fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.submitForm();
  }

  submitForm() {
    this.form = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.postService.createPost(this.form.value);
      this.form.reset();
    }
    else{
      return;
    }
  }


}
