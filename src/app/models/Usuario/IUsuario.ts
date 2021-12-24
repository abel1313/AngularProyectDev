import { ICliente } from ".."
import { IBase } from "../Clientes/IBase"


export class InicializarUsuario
{
    public static inicializarUsuario: IUsuario =
    {
        nombreUsuario: '',
        contrasenaUsuario: '',
        permisos: []
    }

	public static registrarUsuario: IRegistrarUsuario =
    {
		confirmarContrasenaUsuario: '',
		contrasenaUsuario: '',
		nombreUsuario: ''
    }
	public static inicializarClienteUsuario: IClienteUsuario =
	{
		usuario:
		{
			id: 0,
			nombreUsuario: '',
			permisos:[]
		}
	}

}

export interface IRegistrarUsuario
{

	confirmarContrasenaUsuario: string;
	contrasenaUsuario: string;
	nombreUsuario: string;
}
export interface IUsuario extends IBase
{

	nombreUsuario: string;
	contrasenaUsuario: string;
	permisos?: Array<IPermisos>;
}
export interface IUsuarioRespuesta extends IBase
{
	nombreUsuario: string;
	permisos: Array<IPermisos>;
}

export interface IPermisos
{

	usuario?: IUsuario;
	vista: IVista;
}

export interface IVista extends IBase
{
	nombreVista: string;
}


export interface IClienteUsuario extends IBase
{
	usuario: IUsuarioRespuesta;
	cliente?: ICliente;
}