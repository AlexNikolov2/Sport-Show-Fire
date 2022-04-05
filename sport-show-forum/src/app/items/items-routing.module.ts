import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component'
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  { path: 'all-posts', component: AllPostsComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit/:id', component: EditPostComponent },
  { path: 'details/:id', component: PostDetailsComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ItemsRoutingModule { }
