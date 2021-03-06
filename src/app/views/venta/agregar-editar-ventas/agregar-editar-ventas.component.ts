import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente, ICliente, IClienteDTO, IClienteUsuario, IDetalleVenta, IMensajeRespuesta, InicializarUsuario, IPedidoVenta, IRespuestaDTO, IUsuario, IUsuarioRespuesta, IVenta, MensajeFactory, Permisos, UrlApiREST, Venta } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { PipeFechaPipe } from 'src/app/shared/pipe-fecha.pipe';

import Swal from 'sweetalert2';
import { IDetalleVentaMostrar, InicializarVenta, IProducto, Mensaje } from '../../models';

@Component({
  selector: 'app-agregar-editar-ventas',
  templateUrl: './agregar-editar-ventas.component.html',
  styleUrls: ['./agregar-editar-ventas.component.scss']
})
export class AgregarEditarVentasComponent implements OnInit, OnDestroy {

  iProducto: Array<IProducto> = [];
  subscription: Subscription;

  cantidadVenta: string = '';

  realizarVentaMostrar: Boolean = false;
  ventaMostrar: Boolean = false;

  ngModelUsuaio: any;
  ngModelCliente: any;

  nuevoCarrito: Array<IProducto> = [];



  soloLetras: string = '[a-zA-Z ]{2,10}';
  soloNumeros: string = '[${1}]?[0-9]+([.][0-9]+)?$';

  // soloNumeros: string = '^[0-9]+([.][0-9]+)?$';
  soloLetrasNumeros: string = '^[A-Za-z0-9]+$';
  datosVentaFormGroup: FormGroup;
  maximoCarcateres: number = 15;
  minimoCarcateres: number = 3;
  load: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ServicesGenericosService,
    private router: Router,
    private ngZone: NgZone
  ) {

    this.subscription = new Subscription();
  }


  productoInicio: IProducto;

  prodModel: IProducto = InicializarVenta.incializarProducto;
  usuarioModel: IUsuarioRespuesta = InicializarUsuario.inicializarUsuarioRespuesta;
  clienteModel: ICliente = Cliente.incializarCliente;

  bloquearDetalle: Boolean = false;

  iPedidoVenta: Array<IPedidoVenta> = [];
  pedidoVenta: Boolean = false;

  detalleCarrito: Array<IDetalleEx> = []

  totalDetalle: number = 0;
  tipoUsuario: string = '';

  permisosMostrar: Array<number> = [];

  realizarPago: string = 'Relizar pago';
  realizarPedidoVenta: string = 'Relizar pedido';

  disabledRelizarPedidoVenta: Boolean = false;

  detalle: IDetalleVentaMostrar = InicializarVenta.inicializarDetalle;

  carrito: any = {
    // id: 0,
    // nombre: '',
    // precio: 0,
    // cantidad: 0,

  };

  keyworda = 'nombreProducto';

  keywordUsuario = 'nombreUsuario';
  dataUsuario: Array<IUsuarioRespuesta> = [];


  keywordCliente = 'nombreCliente';
  dataCliente: Array<ICliente> = [];

  data = [
    {
      id: 1,
      name: 'Usa'
    },
    {
      id: 2,
      name: 'England'
    }
  ];

  usuarioSesion: Array<IUsuarioRespuesta>  = [];


  ngOnInit(): void {

    this.datosVentaFormGroup = this.fb.group({
      totalVenta: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]],
      pagarCon: ['', [Validators.required, Validators.min(0)]],
      usuarioVenta: ['', [Validators.required, Validators.min(0)]],
      clienteVenta: ['', [Validators.required, Validators.min(0)]],
      usuarioInput: [{ value: '', disabled: true }],
      clienteInput: [{ value: '', disabled: true }],
      cambio: [{ value: '', disabled: true }],

    });


    this.cargarProducto();
    this.mostrarBloqueoVenta();
    this.cargarClientes();

    this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);

    this.usuarioSesion = JSON.parse(localStorage.getItem("session") as any);

    this.tipoUsuario = Permisos.tipoUsuario(this.permisosMostrar);
    if (this.permisosMostrar.length === 0) {
      this.ngZone.run(() => { this.router.navigate(['/sistema']) });
    }


  }

  pagarConKey(pagar: string) {
    let pagarSin: number = parseFloat(pagar.replace('$', ''));
    let total: string = this.datosVentaFormGroup.get('totalVenta')?.value;
    let totalPag: number = parseFloat(total.replace('$', ''));
    let enviarTotal: number = pagarSin - totalPag;

    console.log(enviarTotal, ' eniar');
    if (pagarSin > totalPag) {
      this.disabledRelizarPedidoVenta = true;
      this.datosVentaFormGroup.get('cambio')?.setValue(`$${enviarTotal}`);
    } else {
      this.disabledRelizarPedidoVenta = false;
    }

  }

  btnRealizarPedidoVenta(): void {

    if (this.tipoUsuario !== 'admin') {
      if (
        this.datosVentaFormGroup.get('usuarioInput')?.value !== '' &&
        this.datosVentaFormGroup.get('usuarioInput')?.value !== null &&

        this.datosVentaFormGroup.get('clienteInput')?.value !== '' &&
        this.datosVentaFormGroup.get('clienteInput')?.value !== null &&

        this.datosVentaFormGroup.get('totalVenta')?.value !== '' &&
        this.datosVentaFormGroup.get('totalVenta')?.value !== null &&

        this.datosVentaFormGroup.get('pagarCon')?.value !== '' &&
        this.datosVentaFormGroup.get('pagarCon')?.value !== null
      ) {

      } else {
        Mensaje.mensaje('Mensaje', 'Datos incompletos', 'info', 'Aceptar');
      }
    } else if (this.tipoUsuario === 'admin') {
      if (
        this.datosVentaFormGroup.get('usuarioVenta')?.value !== '' &&

        this.datosVentaFormGroup.get('clienteVenta')?.value !== '' &&

        this.datosVentaFormGroup.get('totalVenta')?.value !== '' &&

        this.datosVentaFormGroup.get('pagarCon')?.value !== ''
      ) {
        let detallePedido: IDetalleVenta = this.obtenerDatosVenta();
        this.load = true;
        this.subscription.add
          (
            this.service.genericoPost<IDetalleVenta, IRespuestaDTO<any>>
              (UrlApiREST.PEDIDO_DETALLE_GUARDAR, detallePedido)
              .subscribe((res) => {
                console.log(res, ' pasando');
                let codigoRespuesta: IMensajeRespuesta = null as any;
                let mostrarMensaje: string = null as any;

                if (res.code === '200 OK') {
                  this.load = false;
                  codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue);
                  mostrarMensaje = codigoRespuesta.mostrarMensaje(res);

                  Mensaje.mensaje('Mensaje', `${mostrarMensaje}`, 'success', 'Aceptar');

                  // this.datosVentaFormGroup.reset();
                  this.realizarVentaMostrar = false;
                  this.pedidoVenta = false;
                  this.ventaMostrar = false;
                  this.carrito = {};
                  this.detalleCarrito = [];
                  this.nuevoCarrito = [];
                  this.prodModel = InicializarVenta.incializarProducto;
                  this.bloquearDetalle = false;
                  this.cantidadVenta = '';
                  this.usuarioModel = InicializarUsuario.inicializarUsuarioRespuesta;
                  this.clienteModel = Cliente.incializarCliente;
                  this.datosVentaFormGroup.get('usuarioVenta')?.setValue(this.usuarioModel);
                  this.datosVentaFormGroup.get('clienteVenta')?.setValue(this.clienteModel);
                  this.datosVentaFormGroup.get('totalVenta')?.setValue('');
                  this.datosVentaFormGroup.get('pagarCon')?.setValue('');
                  this.datosVentaFormGroup.get('cambio')?.setValue('');


                  this.cargarProducto();

                } else {
                  this.load = false;
                  Mensaje.mensaje('Mensaje', `Error al guardar un cliente`, 'success', 'Aceptar');
                }


              }, (error) => {

                this.load = false;
              }));


      } else {
        Mensaje.mensaje('Mensaje', 'Datos incompletosadmin', 'info', 'Aceptar');
      }
    }

  }

  obtenerDatosVenta(): IDetalleVenta {
    let total: string = '';
    let totalSinSigno: number = 0;
    let datosAdmin: IVenta = Venta.inicializarVenta;


    total = this.datosVentaFormGroup.get('totalVenta')?.value;
    totalSinSigno = parseFloat(total.replace('$', ''));
    datosAdmin = Venta.inicializarVenta;

    datosAdmin.fechaVenta = new PipeFechaPipe().transform(new Date());
    datosAdmin.totalVenta = totalSinSigno;

    if (this.tipoUsuario !== 'admin') {
      datosAdmin.usuario = this.datosVentaFormGroup.get('usuarioInput')?.value;
      datosAdmin.cliente = this.datosVentaFormGroup.get('clienteInput')?.value;
    } else if (this.tipoUsuario === 'admin') {
      datosAdmin.usuario = this.datosVentaFormGroup.get('usuarioVenta')?.value;
      datosAdmin.cliente = this.datosVentaFormGroup.get('clienteVenta')?.value;
    }
    let detalleVenta: IDetalleVenta =
    {
      venta: datosAdmin,
      producto: this.nuevoCarrito,
      subtotalDetalle: 0,
      precioDetalle: 0,
      kilosDetalle: 0
    }

    return detalleVenta;
  }
  guardarRealizarPago(): void {

    if (this.tipoUsuario !== 'admin') {
      if (
        this.datosVentaFormGroup.get('usuarioInput')?.value !== '' &&
        this.datosVentaFormGroup.get('usuarioInput')?.value !== null &&

        this.datosVentaFormGroup.get('clienteInput')?.value !== '' &&
        this.datosVentaFormGroup.get('clienteInput')?.value !== null &&

        this.datosVentaFormGroup.get('totalVenta')?.value !== '' &&
        this.datosVentaFormGroup.get('totalVenta')?.value !== null &&

        this.datosVentaFormGroup.get('pagarCon')?.value !== '' &&
        this.datosVentaFormGroup.get('pagarCon')?.value !== null
      ) {

      } else {
        Mensaje.mensaje('Mensaje', 'Datos incompletos', 'info', 'Aceptar');
      }
    } else if (this.tipoUsuario === 'admin') {
      if (
        this.datosVentaFormGroup.get('usuarioVenta')?.value !== '' &&

        this.datosVentaFormGroup.get('clienteVenta')?.value !== '' &&

        this.datosVentaFormGroup.get('totalVenta')?.value !== '' &&

        this.datosVentaFormGroup.get('pagarCon')?.value !== ''
      ) {


        let total: string = this.datosVentaFormGroup.get('totalVenta')?.value;
        let totalSinSigno: number = parseFloat(total.replace('$', ''));
        let datosAdmin: IVenta = Venta.inicializarVenta;
        datosAdmin.fechaVenta = new PipeFechaPipe().transform(new Date());
        datosAdmin.totalVenta = totalSinSigno;
        datosAdmin.usuario = this.datosVentaFormGroup.get('usuarioVenta')?.value;
        datosAdmin.cliente = this.datosVentaFormGroup.get('clienteVenta')?.value;
        let detalleVenta: IDetalleVenta =
        {
          venta: datosAdmin,
          producto: this.nuevoCarrito,
          subtotalDetalle: 0,
          precioDetalle: 0,
          kilosDetalle: 0
        }

        this.load = true;
        this.subscription.add
          (
            this.service.genericoPost<IDetalleVenta, IRespuestaDTO<any>>
              (UrlApiREST.VENTA_DETALLE_GUARDAR, detalleVenta)
              .subscribe((res) => {
                console.log(res, ' pasando');
                let codigoRespuesta: IMensajeRespuesta = null as any;
                let mostrarMensaje: string = null as any;

                if (res.code === '200 OK') {
                  this.load = false;
                  codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue);
                  mostrarMensaje = codigoRespuesta.mostrarMensaje(res);

                  Mensaje.mensaje('Mensaje', `${mostrarMensaje}`, 'success', 'Aceptar');

                  // this.datosVentaFormGroup.reset();
                  this.realizarVentaMostrar = false;
                  this.pedidoVenta = false;
                  this.ventaMostrar = false;
                  this.carrito = {};
                  this.detalleCarrito = [];
                  this.prodModel = InicializarVenta.incializarProducto;
                  this.bloquearDetalle = false;
                  this.cantidadVenta = '';
                  this.usuarioModel = InicializarUsuario.inicializarUsuarioRespuesta;
                  this.clienteModel = Cliente.incializarCliente;
                  this.datosVentaFormGroup.get('usuarioVenta')?.setValue(this.usuarioModel);
                  this.datosVentaFormGroup.get('clienteVenta')?.setValue(this.clienteModel);
                  this.datosVentaFormGroup.get('totalVenta')?.setValue('');
                  this.datosVentaFormGroup.get('pagarCon')?.setValue('');
                  this.datosVentaFormGroup.get('cambio')?.setValue('');


                  this.cargarProducto();

                } else {
                  this.load = false;
                  Mensaje.mensaje('Mensaje', `Error al guardar un cliente`, 'success', 'Aceptar');
                }


              }, (error) => {

                this.load = false;
              }));



      } else {
        Mensaje.mensaje('Mensaje', 'Datos incompletosadmin', 'info', 'Aceptar');
      }
    }



  }

  cargarProducto(): void {
    this.service.getProductoPersonalizado(UrlApiREST.OBTENER_PRODUCTOS).subscribe((res) => {

      this.iProducto = res;

    }, (err: any) => { });
  }



  agregarVenta(cantidad: string): void {

    if (this.prodModel.id !== undefined && cantidad !== '') {
      this.subscription.add
        (this.service.genericoGet<Array<IPedidoVenta>>
          (UrlApiREST.OBTENER_PEDIDO_VENTA)
          .subscribe((pedido) => {

            const pedidoDoble: IPedidoVenta = pedido[0];
            this.pedidoVenta = pedidoDoble.estatus === 'pedido' ? true : false;
            if (!this.pedidoVenta) {

              const producto: IProducto = this.productoInicio;
              this.detalleCarrito = [];
              this.totalDetalle = 0;
              let deta = this.detalleCount(this.detalle, producto, parseFloat(cantidad));
              this.bloquearDetalle = true;
            }
          }, (error: any) => { }));
    } else {
      Mensaje.mensaje('Mensaje', 'Datos incompletos', 'warning', 'Aceptar');
    }


  }
  mostrarDetalle(): void {
    this.bloquearDetalle = false;
    Object.values(this.carrito).forEach((carr: any) => {
      let det: IDetalleEx = {
        id: carr.id,
        cantidadProducto: carr.cantidadProducto,
        nombreProducto: carr.nombreProducto,
        precioProducto: carr.precioProducto,
        subtotalProducto: carr.subtotalProducto
      }
      this.totalDetalle += carr.subtotalProducto;
      this.detalleCarrito.push(det);
    });





  }
  pedido(): void {
    this.bloquearVenta();


  }
  private detalleCount(detalle: IDetalleVentaMostrar,
    producto: IProducto,
    cantidad: number): IDetalleVentaMostrar {

    const id = producto.id !== undefined && producto.id !== null ? producto.id : 0;
    let prodADetalle: IProducto = InicializarVenta.incializarProducto;


    const producto2 = {
      nombreProducto: producto.nombreProducto,
      precioProducto: producto.precioProducto,
      id: id,
      cantidadProducto: cantidad,
      subtotalProducto: cantidad * producto.precioProducto
    }
    this.service.totalNav$.emit(producto2.subtotalProducto);


    if (this.carrito.hasOwnProperty(producto2.id)) {
      producto2.cantidadProducto = this.carrito[producto2.id].cantidadProducto + producto2.cantidadProducto;
      producto2.subtotalProducto = this.carrito[producto2.id].subtotalProducto + (cantidad * producto.precioProducto);
    }

    this.carrito[producto2.id] = { ...producto2 };
    // Object.values(this.carrito).forEach((m: any)=>{

    // });










    return null as any

    return detalle;
  }
  selectEvent(item: IProducto) {
    // do something with selected item

    this.productoInicio = InicializarVenta.incializarProducto;
    this.productoInicio = item;

    this.iProducto = [];
    this.cargarProducto();

 
  }

  onChangeSearch(val: string) {


    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e: any) {
    // do something when input is focused


  }

  realizarPedido(): void {
    if (Object.values(this.carrito).length > 0) {

      if( this.usuarioSesion !== null )
      {
        let usuario: IUsuario =
        {
          id: this.usuarioSesion[0].id,
          contrasenaUsuario: '',
          nombreUsuario: '',
        }
        this.subscription.add
          (this.service.genericoPost<IUsuario, IRespuestaDTO<IClienteUsuario>>
            (UrlApiREST.OBTENER_CLIENTE_USUARIO, usuario).subscribe((res) => {

              console.log(res, '; de nuevo');
              if (res.t.cliente === null) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `${res.mensaje}`,
                  footer: `<a href="clientes">Resgistrar el cliente</a>`

                });
                
              } else {
                this.cargarUsuarios();
                this.cargarClientes();
                let totVenta: number = 0;
  
                Object.values(this.carrito).forEach((m: any) => {
                  let productoCarrito: IProducto =
                  {
                    id: m.id,
                    nombreProducto: m.nombreProducto,
                    precioProducto: m.precioProducto,
                    descripcionProducto: '',
                    kiloProducto: m.cantidadProducto
                  }
                  this.nuevoCarrito.push(productoCarrito);
  
                  totVenta += m.subtotalProducto
                });
                this.datosVentaFormGroup.get('totalVenta')?.setValue(`$${totVenta}`);
                Mensaje.mensaje('Mensaje', `${res.mensaje}`, 'success', 'Aceptar');
                this.ventaMostrar = true;
                this.realizarVentaMostrar = true;
              }
            }, (error: any) => { }));
      } else {
        Mensaje.mensaje('Mensaje', `Campos incompletos`, 'warning', 'Aceptar');
      }
      }
  }
  mostrarBloqueoVenta(): void {
    this.subscription.add
      (this.service.genericoGet<Array<IPedidoVenta>>
        (UrlApiREST.OBTENER_PEDIDO_VENTA)
        .subscribe((pedido) => {
          const pedidoDoble: IPedidoVenta = pedido[0];
          this.pedidoVenta = pedidoDoble.estatus === 'pedido' ? true : false;
        }, (error: any) => { }));
  }
  bloquearVenta(): void {
    this.subscription.add
      (this.service.genericoGet<Array<IPedidoVenta>>
        (UrlApiREST.OBTENER_PEDIDO_VENTA)
        .subscribe((pedido) => {
          const pedidoDoble: IPedidoVenta = pedido[0];
          let cns: string = pedidoDoble.estatus === 'pedido' ? 'sin pedido' : 'pedido';
          this.pedidoVenta = pedidoDoble.estatus === 'pedido' ? false : true;
          pedidoDoble.estatus = cns;
          this.subscription.add
            (this.service.genericoPost<IPedidoVenta, IPedidoVenta>
              (UrlApiREST.OBTENER_PEDIDO_VENTA, pedidoDoble)
              .subscribe((pedidoCambiado) => {

              }, (error) => { }));


        }, (error: any) => { }));
  }

  desbloquearVenta(): void {
    this.subscription.add
      (this.service.genericoGet<Array<IPedidoVenta>>
        (UrlApiREST.OBTENER_PEDIDO_VENTA)
        .subscribe((pedido) => {
          let pedidoDoble: IPedidoVenta = pedido[0];

          this.pedidoVenta = pedidoDoble.estatus === 'pedido' ? true : false;
          if (this.pedidoVenta) {
            pedidoDoble.estatus = 'sin pedido'
            this.subscription.add
              (this.service.genericoPost<IPedidoVenta, Array<IPedidoVenta>>
                (UrlApiREST.OBTENER_PEDIDO_VENTA, pedidoDoble)
                .subscribe((pedido) => {
                  this.detalleCarrito = [];

                }, (error: any) => { }));
          }



          this.pedidoVenta = pedidoDoble.estatus === 'pedido' ? true : false;

        }, (error: any) => { }));
  }

  cargarUsuarios(): void {
    this.subscription.add(this.service.genericoGet<IRespuestaDTO<Array<IUsuarioRespuesta>>>(UrlApiREST.OBTENER_USUARIOS).subscribe((res) => {
      console.log(res, ' resesas')
      this.dataUsuario = res.t;
    }, (error) => { }));
  }
  cargarClientes(): void {
    this.subscription.add(this.service.genericoGet<IRespuestaDTO<Array<IClienteDTO>>>(UrlApiREST.OBTENER_CLIENTES).subscribe((res) => {

      this.dataCliente = res.t.map((m) => {
        let dato: any = {
          id: m.id,
          nombreCliente: m.nombre
        }
        return dato;
      });

      console.log(this.dataCliente, ' cliente ', this.data);

    }, (error) => { }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

export interface IProd {
  id: number;
  nombreProducto: string;

}

export class ProddClass {
  public static p: IProd =
    {
      id: 0,
      nombreProducto: ''
    }
}

export interface IDetalleEx {
  cantidadProducto: number;
  id: number;
  nombreProducto: string;
  precioProducto: number;
  subtotalProducto: number;

}
