import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { ConfigDatatable, IRespuestaDTO, IUsuario, IUsuarioRespuesta, Permisos, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { Mensaje } from '../../models';

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
  datosUsuario: Observable<Array<IUsuarioRespuesta>>;



  permisosMostrar: Array<number> = [];
  mostrarAgregarUsuario: Boolean = false;
  usuarioEditar: IUsuarioRespuesta;




  ngOnInit(): void {
      this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length === 0) {
      this.ngZone.run(() => { this.router.navigate(['/sistema']) });
    }
    this.dtOptions = ConfigDatatable.dtOptions;
    
    setTimeout(()=>{
      this.cargarUsuarios();
          },1000 );

          this.subscription.add(this.service.mostrarProductos$.subscribe( (res)=>
          {
            this.mostrarAgregarUsuario = res
          }
          ));
  }

  cargarUsuarios(): void
  {
    this.subscription.add( this.service.obtenerCliente<IRespuestaDTO<Array<IUsuarioRespuesta>>>(UrlApiREST.OBTENER_USUARIOS)
    .subscribe( ( res )=>{
      this.datosUsuario = of(res.t);



      console.log(res)
      this.rerenderTable();  
      
    }, err=> console.log(err) ) );
  }


  editarUsuario( item: IUsuarioRespuesta): void{
    this.usuarioEditar = item;
    this.mostrarAgregarUsuario = true;
  }
  eliminarUsuario( item: IUsuarioRespuesta): void{
    console.log(item)
    const id: number = item.id !== null && item.id !== undefined ?  item.id : 0 ;
    if( id !== 0 )
    {
      this.load = true;
      this.subscription.add(this.service.eliminar<Boolean>(id, UrlApiREST.ELIMINAR_USUARIO).subscribe( (res)=>{
      if( res)
      {
        this.load = false;
        Mensaje.mensaje('Mensaje','El usuario se eliminó correctamente','success','Aceptar');
        this.cargarUsuarios();
      }else
      {
        this.load = false;
        Mensaje.mensaje('Mensaje','No se eliminó el usuario','info','Aceptar');
        this.cargarUsuarios();
      }
      },(err)=>{

        this.load = false;
        Mensaje.mensaje('Mensaje','Ocurrio un error al eliminar el usuario','error','Aceptar');
      }) );

    }else
    {
      console.log('No entro ')
    }
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

      this.subscription.unsubscribe();
      console.log(' entro mostrar')
    
        
  }

}
