import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsRoutingModule } from './items-routing.module';


@NgModule({
  declarations: [
    AllPostsComponent,
    PostDetailsComponent,
    EditPostComponent,
    CreatePostComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
