import { IProducto } from "src/app/views/models";
import { ICliente, IUsuario } from "..";
import { IBase } from "../Clientes/IBase";






export interface IVenta extends IBase
{
	totalVenta: number;
	fechaVenta: string;
	 cliente: ICliente;
	usuario: IUsuario;
}
export interface IDetalleVenta extends IBase
{
	venta: IVenta,
	producto: Array<IProducto>,
	subtotalDetalle: number;
	precioDetalle: number;
	kilosDetalle: number;

}

export class Venta
{
	public static inicializarVenta: IVenta =
	{
		totalVenta: 0,
		fechaVenta: '',
		 cliente: {
			 id:0,
			 personaCliente:
			 {
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
					numeroExterior: ''
				}
			 }
		 },
		usuario: {
			nombreUsuario: '',
			contrasenaUsuario: '',
			permisos: []
				
		}
	}
}