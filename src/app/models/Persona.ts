import { IBase } from "./Clientes/IBase";


export class Persona
{
    public static inicializarPersonaSin: IPersonaSin =
    {
        id: 0,
        nombrePersona:        '',
        apeidoPaternoPersona: '',
        apeidoMaternoPersona: '',
        generoPersona:        '',
        fechaNacimiento: ''
    }

    public static convertirPersona( persona: IPersona ): IPersonaSin
    {
        let personaSin : IPersonaSin = this.inicializarPersonaSin;
        
        if( persona !== null )
        {
           let fecha: Date = new Date(persona.fechaNacimiento);
           let fecha2: Array<string> = persona.fechaNacimiento.split('-');

           let dia: string = (fecha.getDate()) > 9 ? (fecha.getDate()).toString() : `0${(fecha.getDate())}` ;;
           let mes: string = (fecha.getMonth()+1) > 9 ? (fecha.getMonth()+1).toString() : `0${(fecha.getMonth()+1)}` ;
           let yyyy: string = (fecha.getFullYear()).toString();
            personaSin.id = persona.id;
            personaSin.nombrePersona = persona.nombrePersona;
            personaSin.apeidoPaternoPersona = persona.apeidoPaternoPersona;
            personaSin.apeidoMaternoPersona = persona.apeidoMaternoPersona;
            personaSin.generoPersona = persona.generoPersona;
            personaSin.fechaNacimiento = '' ;
        }

        return personaSin;
        

    }


}
export interface IPersonaSin extends IBase {
    nombrePersona:        string;
    apeidoPaternoPersona: string;
    apeidoMaternoPersona: string;
    generoPersona:        string;
    fechaNacimiento: string;
}
export interface IPersona {
    id:                   number;
    nombrePersona:        string;
    apeidoPaternoPersona: string;
    apeidoMaternoPersona: string;
    generoPersona:        string;
    fechaNacimiento: string;
    direccion:            IDireccion[];
}

export interface IDireccion {
    id:                    number;
    estadoDireccion:       string;
    calleDireccion:        string;
    coloniaDireccion:      string;
    codigoPostalDireccion: string;
}

