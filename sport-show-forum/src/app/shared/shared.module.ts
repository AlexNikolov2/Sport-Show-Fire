import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NumShortenPipe } from './pipes/num-shorten.pipe';



@NgModule({
  declarations: [
    TimeDiffPipe,
    ShortenPipe,
    NumShortenPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeDiffPipe,
    ShortenPipe,
    NumShortenPipe,
  ]
})
export class SharedModule { }
