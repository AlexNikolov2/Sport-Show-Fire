import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    ShortenPipe,
    NotFoundComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortenPipe,
  ]
})
export class SharedModule { }
