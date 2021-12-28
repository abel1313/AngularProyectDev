import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeKilos'
})
export class PipeKilosPipe implements PipeTransform {

  transform( kilos: number): string {
    
    return `${kilos} kilos`  ;
  }

}
