import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { ConfigDatatable, IRespuestaDTO, IUsuario, IUsuarioRespuesta, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.scss']
})
export class MostrarUsuariosComponent implements OnInit, AfterViewInit, OnDestroy  {

  constructor( private service: ServicesGenericosService, private ngZone: NgZone, private router: Router ) { 
    this.subscription = new Subscription();
  }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  load: Boolean = false;
  subscription: Subscription;
  datosUsuario: Array<IUsuarioRespuesta> = []

  ngOnInit(): void {

    this.dtOptions = ConfigDatatable.dtOptions;

    setTimeout(()=>{
      this.cargarUsuarios();
          },1500 );
  }

  cargarUsuarios(): void
  {
    this.subscription.add( this.service.obtenerCliente<IRespuestaDTO<Array<IUsuarioRespuesta>>>(UrlApiREST.OBTENER_USUARIOS)
    .subscribe( ( res )=>{
      this.datosUsuario = res.t;



      console.log(res)
      this.rerenderTable();  
      
    }, err=> console.log(err) ) );
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
