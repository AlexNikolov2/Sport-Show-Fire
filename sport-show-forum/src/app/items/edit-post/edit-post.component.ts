import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editForm: FormGroup;
  post: any;
  editLink!: string;
  submitted: boolean = false;

  constructor(
    public firestore: AngularFirestore,
    public route: ActivatedRoute,
    public postService: PostService,
    public fireauth: AngularFireAuth,
    public fb: FormBuilder, private router: Router
    ) { 

    this.editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  }); 
}

  ngOnInit(): void {
    this.postService.getPostById(this.route.snapshot.params['id']).subscribe((post: any) => {
        this.post = post;
        this.editLink = "/edit/" + this.route.snapshot.params['id'];
        this.editForm.controls['title'].setValue(post.title);
        this.editForm.controls['image'].setValue(post.image);
        this.editForm.controls['description'].setValue(post.description);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      const postObject = {...this.post, ...{ title: this.editForm.controls['title'].value, description: this.editForm.controls['description'].value,
        image:this.editForm.controls['image'].value}};
      this.postService.update(postObject, this.route.snapshot.params['id']);
      this.editForm.reset();
      this.router.navigate(['/details/' + this.route.snapshot.params['id']]);
    }
    else{
      return;
    }

  }

}
