import { IBase } from "src/app/models/Clientes/IBase";




export interface IProducto {
    id?:                  number;
    nombreProducto:      string;
    precioProducto:      number;
    descripcionProducto: string;
    kiloProducto:        number;
}

export interface IProductoPersonalizado extends IBase
{
    nombreProducto:      string;
}


export interface IDetalleVentaMostrar extends IBase
{
    detalle: Array<IDetalleVenta>;
    total: number;
}
export interface IDetalleVenta extends IBase
{
    nombreProducto: string;
    precioProducto:      number;
    kiloProducto:        number;
    subTotal: number;
}

export class InicializarVenta
{
    public static incializarProducto =
    {
        id:                  0,
        nombreProducto:      '',
        precioProducto:      0,
        descripcionProducto: 'strin',
        kiloProducto:        0
    }
    public static inicializarVenta: IProductoPersonalizado =
        {
            nombreProducto: '',
            id: 0
        }

        public static inicializarDetalle: IDetalleVentaMostrar =
        {
            id: 0,
            total: 0,
            detalle: []
        }
    
}