import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmail'
})
export class FiltroEmailPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
