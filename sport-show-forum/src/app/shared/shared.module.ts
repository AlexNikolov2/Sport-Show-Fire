import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenPipe } from './pipes/shorten.pipe';
import { NumShortenPipe } from './pipes/num-shorten.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  declarations: [
    DateAgoPipe,
    ShortenPipe,
    NumShortenPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateAgoPipe,
    ShortenPipe,
    NumShortenPipe,
  ]
})
export class SharedModule { }
