import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Cliente, ConfigDatatable, ICliente, IDatosMostrar, IMensajeRespuesta, IRespuestaDTO, MensajeFactory, Permisos, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import Swal from 'sweetalert2';
import { Mensaje } from '../../models';

@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.scss']
})
export class MostrarClientesComponent implements OnInit, AfterViewInit, OnDestroy  {

  constructor( private service: ServicesGenericosService, private ngZone: NgZone, private router: Router ) { 

    this.subscription = new Subscription();
  }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  enviarTituloEditarCliente: string = '';

  enviarClienteEditar: IDatosMostrar;

  datosCliente: Observable<Array<IDatosMostrar>>;
  datosClienteMostrar: Array<IDatosMostrar> = [];

   datosMostrar: Array<IDatosMostrar> = [];

  
   
  permisosMostrar: Array<number> = [];

  load: Boolean = false;

  mostrarAgregarEditar: Boolean = false;


  subscription: Subscription;
  ngOnInit(): void {

           this.permisosMostrar = Permisos.localStorageSession( localStorage.getItem("session") as any);
    if(this.permisosMostrar.length === 0)
    {
      this.ngZone.run(()=>{this.router.navigate(['/sistema'])});
    }

    this.dtOptions = ConfigDatatable.dtOptions;


    setTimeout(()=>{
this.cargarClientes();
    },1500 );

    this.mostrarDatosNav()
  }

 
  mostrarDatosNav(): void
  {
    
    
    this.subscription.add(this.service.mostrarProductos$.subscribe(( res: Boolean)=>{
      this.mostrarAgregarEditar = res;
    }));
  }
  cargarClientes(): void
  {
    this.service.obtenerCliente<IRespuestaDTO<Array<IDatosMostrar>>>(UrlApiREST.OBTENER_CLIENTES)
    .subscribe( ( res )=>{
      this.datosCliente = of(res.t);
      this.rerenderTable();  
      
    }, err=> console.log(err));
  }

  editarCliente( cliente: IDatosMostrar ): void
  {
  
    this.mostrarAgregarEditar = !this.mostrarAgregarEditar;
    this.enviarTituloEditarCliente = 'Editar Cliente'
    this.enviarClienteEditar = cliente;
  }
  eliminarCliente(cliente: IDatosMostrar ): void
  {
    Swal.fire({
      title: 'Mensaje confirmacion',
      text: "Esta seguro de eliminar este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
   
      if (result.isConfirmed) {
   
    
        if( cliente.id  !== null && cliente.id !== undefined )
        {
          this.load = true;
          this.subscription
          .add( 
            this.service
            .eliminar<IRespuestaDTO<ICliente>>(cliente.id, UrlApiREST.ELIMINAR_CLIENTE)
            .subscribe( (res )=> {
              this.load = false;

              let codigoRespuesta: IMensajeRespuesta = null as any;
              let mostrarMensaje: string = null as any;
        
              if( res.code === '200 OK' )
              {
                this.cargarClientes();

                this.load = false;

                   codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue) ;
                   mostrarMensaje = codigoRespuesta.mostrarMensaje(res);
          
                  Mensaje.mensaje('Mensaje',`${mostrarMensaje}`, 'success','Aceptar');
                  // this.ngZone.run(()=>{
                  //   this.router.navigate(['/clientes/mostrar']);
                  // });
              }else
              {
                this.load = false;

                Mensaje.mensaje('Mensaje',`Error al guardar un cliente`, 'success','Aceptar');
              }

            }, err=> {
              this.load = false;

            } ));
        }

    
         
      }
    });
    
   
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    
  }

  // método para renderizar la tabla
  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    console.log(' desemtrea');
        this.subscription.unsubscribe();
  }
}
