import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numShorten'
})
export class NumShortenPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
