import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import {
  ConfigDatatable,
  IPedido,
  IResponsePedido,
  IRespuestaDTO,
  Permisos,
  UrlApiREST
} from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.component.html',
  styleUrls: ['./mostrar-pedidos.component.scss']
})
export class MostrarPedidosComponent implements OnInit, OnDestroy, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  load: Boolean = false;
  subscription: Subscription;
  mostrarAgregarUsuario: Boolean = false;


  iResponsePedido: Array<IResponsePedido> = [];


  permisosMostrar: Array<number> = [];

  constructor(
    private service: ServicesGenericosService,
    private ngZone: NgZone,
    private router: Router
  ) {

    this.subscription = new Subscription();

  }

  ngOnInit(): void {

    this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length === 0) {
      this.ngZone.run(() => { this.router.navigate(['/sistema']) });
    }


    this.dtOptions = ConfigDatatable.dtOptions;

    setTimeout(() => {
      this.cargarPedidos();
    }, 1500);

    this.subscription.add(this.service.mostrarProductos$.subscribe((res) => {
      this.mostrarAgregarUsuario = res
    }
    ));

  }

  cargarPedidos(): void {
    this.subscription.add(this.service.genericoGet<IRespuestaDTO<Array<IResponsePedido>>>(UrlApiREST.OBTENER_PEDIDO)
      .subscribe((res) => {
        this.iResponsePedido = res.t;


        console.log(this.iResponsePedido)
        console.log(res.t)
        this.rerenderTable();

      }, err => console.log(err)));
  }

  editarPedido(intem: IResponsePedido): void {

  }
  eliminarPedido(intem: IResponsePedido): void {

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
