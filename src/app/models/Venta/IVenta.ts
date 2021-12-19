import { ICliente, IUsuario } from "..";
import { IBase } from "../Clientes/IBase";






export interface IVenta extends IBase
{

	totalVenta: number;
	fechaVenta: string;
	 cliente: ICliente;
	usuario: IUsuario;

}