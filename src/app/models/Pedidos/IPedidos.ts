import { ICliente, IUsuario, IVenta } from "..";
import { IBase } from "../Clientes/IBase";




export interface IPedido extends IBase {
    fechaPedido: string;
    estatusPedido: string;
    venta: IVenta;
    usuario: IUsuario;


}