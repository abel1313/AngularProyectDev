import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFecha'
})
export class PipeFechaPipe implements PipeTransform {

  transform(value: Date): string {
    let dd: string = value.getDate() > 9 ? value.getDate().toString() : `0${value.getDate().toString()}`;
    let mm: string =  (value.getMonth()+1) > 9 ? (value.getMonth()+1).toString() : `0${(value.getMonth()+1)}`;
    let yyyy: string = `${value.getFullYear()}`;
    let fecha: string = `${yyyy}-${mm}-${dd}`;
    return fecha;
  }

}
