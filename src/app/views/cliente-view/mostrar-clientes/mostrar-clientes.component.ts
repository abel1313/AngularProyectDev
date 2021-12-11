import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Cliente, ICliente, IDatosMostrar, IMensajeRespuesta, IRespuestaDTO, MensajeFactory, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import Swal from 'sweetalert2';
import { Mensaje } from '../../models';

@Component({
  selector: 'app-mostrar-clientes',
  templateUrl: './mostrar-clientes.component.html',
  styleUrls: ['./mostrar-clientes.component.scss']
})
export class MostrarClientesComponent implements OnInit, AfterViewInit  {

  constructor( private service: ServicesGenericosService, private ngZone: NgZone, private router: Router ) { 

    this.subscription = new Subscription();
  }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;



  datosCliente: Array<ICliente> = [];
  datosClienteMostrar: Array<IDatosMostrar> = [];

   datosMostrar: Array<IDatosMostrar> = [];

  
  load: Boolean = false;


  subscription: Subscription;
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: false,
      retrieve: true,
      pageLength: 5,
      responsive: true,
      language: {
          url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      }
    };

   
    setTimeout(()=>{
this.cargarClientes();
    },1500 );


  
  }



  
  cargarClientes(): void
  {
    const url: string = 'clientes';
    this.subscription.add( this.service.generico<ICliente>(url).subscribe( ( res: Array<ICliente> )=>{
      this.datosMostrar =  new Cliente().datosUsuario(res);
      this.datosCliente = res;
      this.rerenderTable();  
      
    }, err=> console.log(err) ) );
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
    this.dtTrigger.unsubscribe();
    if( this.subscription != null )
        this.subscription.unsubscribe();
  }
}
