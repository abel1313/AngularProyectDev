import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { ConfigDatatable, IRespuestaDTO, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-mostrar-ventas',
  templateUrl: './mostrar-ventas.component.html',
  styleUrls: ['./mostrar-ventas.component.scss']
})
export class MostrarVentasComponent implements OnInit,  OnDestroy, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  load: Boolean = false;
  subscription: Subscription;
  mostrarAgregarUsuario: Boolean = false;

  constructor(
    private service: ServicesGenericosService, 
    private ngZone: NgZone, 
    private router: Router

  ) {
    this.subscription = new Subscription();
   }

  ngOnInit(): void {
    
    this.dtOptions = ConfigDatatable.dtOptions;
    setTimeout(()=>{
      this.cargarVenta();
          },1500 );

  }

  
  cargarVenta(): void
  {
    this.subscription.add( this.service
      .genericoGet<IRespuestaDTO<Array<any>>>(UrlApiREST.OBTENER_PEDIDO)
    .subscribe( ( res )=>{
        // this.iResponsePedido = res.t;

      // this.rerenderTable();  
      
    }, err=> console.log(err) ) );
  }

  editarPedido( intem: any ): void
  {

  }
eliminarPedido( intem: any ): void
{

}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}
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
}



}
