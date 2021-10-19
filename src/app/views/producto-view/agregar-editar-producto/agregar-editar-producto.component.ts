import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

import { ActivatedRoute, Params } from '@angular/router';
import { IProducto, Mensaje } from '../../models';



@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.scss'],
  // add NgbAlertConfig  to the component providers

})
export class AgregarEditarProductoComponent implements OnInit, OnDestroy {

  @Input() productoAgregarEditar: IProducto;
  @Input() tituloEditar: string;
  tituloProducto: string = '';
  subscription: Subscription = new Subscription();
soloNumeros: string = '^[0-9]+([.][0-9]+)?$';
  load: Boolean = false;
  type: string = 'success';

  mostrarMensjae: Boolean = false;

  mensaje: string = '';
  closed: Boolean = false;


  formProducto: FormGroup = this.fb.group({
      nombreProducto:['',[Validators.required, Validators.minLength(5)]],
      precioProducto:['', [Validators.required, Validators.pattern(this.soloNumeros)]],
      descripcionProducto:['', ],
      kiloProducto:['',[Validators.required, Validators.pattern(this.soloNumeros) ]]

  });
  constructor( private fb: FormBuilder, private router: Router, 
    private service: ServicesGenericosService, private rutaActiva: ActivatedRoute ) {

   }

  ngOnInit(): void {

    this.agregarEditar();

    this.tituloProducto = this.tituloEditar;

  if( this.tituloProducto == 'Editar producto')
  {
   this.llenarFormEditar();
  }
    
  }
  // eventEditarProduto()
  // {
  //   this.subscription.add(this.service.editarProductoAgregar$.subscribe((ite: IProducto)=>{
  //   console.log(ite);
  //     this.tituloProducto = 'Editar Producto'
  //   }));
  // }

  cerrar():void
  {
    this.mensaje = '';
    this.mostrarMensjae = false;
  }
  onSubmit(): void
  { 
    let mostrarMensaje = this.tituloProducto == 'Editar producto' ? 'El producto se actualizo correctamente': 'El producto se agregao correctamente';
    let url: string = 'productos';
    let enviar:IProducto = 
    {
      id: this.productoAgregarEditar !== undefined ? this.productoAgregarEditar.id : 0,
      nombreProducto: this.formProducto.get('nombreProducto')?.value,
      precioProducto:this.formProducto.get('precioProducto')?.value,
      descripcionProducto:this.formProducto.get('descripcionProducto')?.value,
      kiloProducto:this.formProducto.get('kiloProducto')?.value,
    }
    this.load = true;
    this.service.serviceGenerico<IProducto,IProducto>(enviar, url).subscribe((res)=>{
      this.load = false;
      this.mensaje = 'Se guardo correctamente';
      this.mostrarMensjae = true;
      Mensaje.mensaje('Alerta',mostrarMensaje, 'success', 'Aceptar');
      this.service.mostrarProductos$.emit(false);
      this.formProducto.reset();
console.log(res)
    }, err=> 
    {
      this.load = true;
      console.log(err)
    });
  }

  agregarEditar(): void
  {
    if(this.router.url === '/productos')
    {
      this.tituloProducto = 'Agregar producto';
    } 
   console.log( this.router.url );
  }


  llenarFormEditar(): void
  {
    this.formProducto.get('nombreProducto')?.setValue(this.productoAgregarEditar.id);
    this.formProducto.get('nombreProducto')?.setValue(this.productoAgregarEditar.nombreProducto);
    this.formProducto.get('precioProducto')?.setValue(this.productoAgregarEditar.precioProducto);
    this.formProducto.get('descripcionProducto')?.setValue(this.productoAgregarEditar.descripcionProducto);
    this.formProducto.get('kiloProducto')?.setValue(this.productoAgregarEditar.kiloProducto);

  }

  ngOnDestroy(): void {
    if( this.subscription !== null )
        this.subscription.unsubscribe();
  }

}


