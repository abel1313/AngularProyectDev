import { IUsuarioRespuesta, IVenta } from "..";


export interface IResponsePedido
{

    fechaPedido: string;
    estatusPedido: string;
    venta: IVenta;
    usuario: IUsuarioRespuesta;


}





