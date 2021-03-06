
import { IUsuarioRespuesta } from "..";
import { IBase } from "./IBase";
import { IDireccion } from "./IDireccion";
import { IPersona } from "./IPersona";


export interface ICliente extends IBase
{
    personaCliente: IPersona;
}

export interface IClienteUsuario extends IBase
{
    personaCliente: IPersona;
    usuario: IUsuarioRespuesta;
}


export interface IClienteDTO
{
    id: number
    nombre: string;
    apeidos: string;
    estado: string;

}

export interface IBuscarId
{
    id: number;
}


export class Cliente{

    public static inicializarClienteUsuario: IClienteUsuario =
    {
        personaCliente: {
            nombrePersona: '',
            apeidoPaternoPersona: '',
            apeidoMaternoPersona: '',
            generoPersona: '',
            fechaNacimiento: '',
            direccion: {
                estadoDireccion:       '',
                calleDireccion:        '',
                coloniaDireccion:      '',
                codigoPostalDireccion: '',
                numeroInterior: '',
                numeroExterior: '',
            }
        },
        usuario: {
            nombreUsuario: '',
            permisos: []
        }
    }
    public static inicializarIMostrarDatos =
    {
    id: 0,
    nombre: '',
    apeidos: '',
    estado: ''
    }
    
    public static incializarCliente: ICliente = 
    {
        id: 0,
        personaCliente:
        {
            id: 0,
            nombrePersona: '',
            apeidoPaternoPersona: '',
            apeidoMaternoPersona: '',
            generoPersona: '',
            fechaNacimiento: '',
            direccion: 
            {
                id: 0,
                estadoDireccion:       '',
                calleDireccion:        '',
                coloniaDireccion:      '',
                codigoPostalDireccion: '',
                numeroInterior: '',
                numeroExterior: '',
            }
        }
    };


    constructor()
    {

    }

    public datosUsuario(datos: Array<ICliente> ): Array<IDatosMostrar>
    {
        let datosClientes: Array<IDatosMostrar> = datos.map((dato: ICliente)=>{
            let datosCliente: IDatosMostrar =
            {
                id: dato.id,
                nombre: dato.personaCliente.nombrePersona,
                apeidos: `${dato.personaCliente.apeidoPaternoPersona} ${dato.personaCliente.apeidoMaternoPersona}` ,
                estado: `${dato.personaCliente.direccion.calleDireccion } ${dato.personaCliente.direccion.coloniaDireccion }`
            }
            return datosCliente;
        });

        return datosClientes;
    }

}

export interface IDatosMostrar
{
    id?: number;
    nombre: string;
    apeidos: string;
    estado: string;
}