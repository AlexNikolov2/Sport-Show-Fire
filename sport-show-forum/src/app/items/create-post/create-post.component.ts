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
  submitted: boolean = false;
  constructor(private postService: PostService, public fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.form = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  /*submitForm() {
    
  }*/

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
      this.postService.createPost(this.form.controls['keyword'].value, this.form.controls['title'].value, this.form.controls['image'].value, this.form.controls['description'].value);
      this.form.reset();
      this.router.navigate(['/all-posts']);
  }


}
