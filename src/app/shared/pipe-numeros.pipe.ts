import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeNumeros'
})
export class PipeNumerosPipe implements PipeTransform {

  transform(value: string): string {
    let nuevoValor = value.replace('$','');

    return `$${nuevoValor}`;
  }

}
