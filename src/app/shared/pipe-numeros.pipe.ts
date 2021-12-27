import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeNumeros'
})
export class PipeNumerosPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value, ' value');
    let nuevoValor = value.replace('$','');

    return `$${nuevoValor}`;
  }

}
