import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenPipe } from './pipes/shorten.pipe';
import { NumShortenPipe } from './pipes/num-shorten.pipe';



@NgModule({
  declarations: [
    ShortenPipe,
    NumShortenPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortenPipe,
    NumShortenPipe,
  ]
})
export class SharedModule { }
