import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Permisos } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { IProducto } from '../../models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit, OnDestroy {

  mostrarAgregarProducto: Boolean = false;
  mostrarProducto: Boolean = false;

  enviarTitulo: string;

  editarAgregar: IProducto;
  productos$: Observable<IProducto[]>;

  datos$: Observable<any>;

  
  
  
  permisosMostrar: Array<number> = [];
  subscription: Subscription = new Subscription();
  constructor(private service: ServicesGenericosService, private router: Router, private _ngZone: NgZone) { }


  ngOnInit(): void {
this.eventEditarProduto();
this.eventMostrarProductoDesdeAgregar();

      this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length === 0) {
      this._ngZone.run(() => { this.router.navigate(['/sistema']) });
    }
// this.subscription.add( this.service.productos<IProducto>('productos').subscribe((res)=>{

// this.productos$ = of(res);
// this.mostrarAgregarProducto = true;
// },(err: HttpErrorResponse)=>console.log(err)) );

  }
  eventMostrarProductoDesdeAgregar(): void
  {
    this.subscription.add(this.service.mostrarProductos$.subscribe((mostrar: Boolean)=>{
      this.mostrarProducto = mostrar;

    }));
  }
  eventEditarProduto()
  {
    this.subscription.add(this.service.editarProductoAgregar$.subscribe((ite: IProducto)=>{
      this.mostrarProducto = true;
     // this.service.editarProductoAgregar$.emit(ite);
     this.editarAgregar = ite;
     this.enviarTitulo = 'Editar producto';

    }));
  }

  agregarProducto(): void
  {
      
    this.mostrarProducto = true
    this.enviarTitulo = 'Agregar producto'
      
  }
  cancelarProducto(): void
  {
      
    this.mostrarProducto = false
  }

  ngOnDestroy(): void {
    if( this.subscription !== null )
          this.subscription.unsubscribe();
  }

}
