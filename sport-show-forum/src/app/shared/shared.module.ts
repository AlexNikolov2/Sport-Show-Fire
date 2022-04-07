import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NumShortenPipe } from './pipes/num-shorten.pipe';
import { CustomValidatorDirective } from './directives/custom-validator.directive';



@NgModule({
  declarations: [
    TimeDiffPipe,
    ShortenPipe,
    NumShortenPipe,
    CustomValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeDiffPipe,
    ShortenPipe,
    NumShortenPipe,
    CustomValidatorDirective
  ]
})
export class SharedModule { }
