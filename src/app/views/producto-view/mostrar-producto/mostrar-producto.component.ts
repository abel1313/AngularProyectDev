import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import Swal from 'sweetalert2';
import { IProducto, Mensaje } from '../../models';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.scss']
})
export class MostrarProductoComponent implements OnInit, OnDestroy {

  @Input() datosProducto$: Observable<IProducto[]>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  load: Boolean = false;
  mostrarAgregarEditar$: Observable<Boolean>;

  datosProd: IProducto[] = [];
  subscription: Subscription = new Subscription();

  constructor( private service: ServicesGenericosService, private router: Router, private _ngZone: NgZone) { }

  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,
      language: {
          url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      }
    };

this.cargarTablaProducto();
      this.mostrarAgregarEditar$ = this.service.mostrarAgregarEditar$;
  }

  cargarTablaProducto(): void
  {
   
   

    this.subscription.add( this.service.productos<IProducto>('productos').subscribe((res)=>{

      this.datosProd = res;
      this.dtTrigger.next();
      
      },(err: HttpErrorResponse)=>console.log(err)) );
  }

  editarProducto(item: IProducto): void
  {
    this.service.editarProductoAgregar$.emit(item);
  } 

  eliminar(item: IProducto): void
  {


    Swal.fire({
      title: 'Mensaje confirmacion',
      text: "Esta seguro de eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        let id: number | any = item !== undefined ? item.id : 0 ;
        let url: string = 'productos';
    
        this.load = true;
        this.subscription.add(this.service.eliminar<Boolean>(id, url).subscribe((res: Boolean)=>
        {
          if(res)
          {
            this.load = false;
           
            Mensaje.mensaje('Mensaje','El producto se elimino correctamente','success','OK');
            this._ngZone.run( ()=>{   this.router.navigateByUrl('eliminar');});
           
          }else
          {
            this.load = false;
            Mensaje.mensaje('Mensaje','El producto no se elimino correctamente','error','OK');
          }
          },
         err=>  {
          this.load = false; Mensaje.mensaje('Mensaje','Error al eliminar el producto','error','OK')
         }));
         
      }
    });



  } 

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }

}
