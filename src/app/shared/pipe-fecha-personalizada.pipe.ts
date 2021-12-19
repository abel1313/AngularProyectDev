import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFechaPersonalizada'
})
export class PipeFechaPersonalizadaPipe implements PipeTransform {

  transform(fecha: string ): string {
    let value = new Date(fecha);
    let dd: string = value.getDate() > 9 ? value.getDate().toString() : `0${value.getDate().toString()}`;
    let mm: string =  (value.getMonth()+1) > 9 ? (value.getMonth()+1).toString() : `0${(value.getMonth()+1)}`;
    let yyyy: string = `${value.getFullYear()}`;

    let hh: string = value.getHours() > 9 ? value.getHours().toString() : `0${value.getHours().toString()}`;
    let min: string = value.getMinutes() > 9 ? value.getMinutes().toString() : `0${value.getMinutes().toString()}`;
    let seg: string = value.getSeconds() > 9 ? value.getSeconds().toString() : `0${value.getSeconds().toString()}`;
    let tipoHora: string = value.getHours() >= 12 ? 'PM' : 'AM';
    let ff: string = `${yyyy}-${mm}-${dd} ${hh}:${min}:${seg} ${tipoHora}`;
    

    return ff;
  }

}
