import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component'
import { PostDetailsComponent } from './post-details/post-details.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { OwnerGuard } from '../core/guards/owner.guard';

const routes: Routes = [
  { path: 'all-posts', component: AllPostsComponent, canActivate: [AuthGuard], data: { authRequired: false } },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard], data: { authRequired: true } },
  { path: 'edit/:id', component: EditPostComponent, canActivate: [OwnerGuard], data: { authRequired: true } },
  { path: 'details/:id', component: PostDetailsComponent, canActivate: [AuthGuard], data: { authRequired: false } },
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
