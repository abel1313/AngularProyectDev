import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoViewRoutingModule } from './producto-view-routing.module';
import { AgregarEditarProductoComponent } from './agregar-editar-producto/agregar-editar-producto.component';
import { MostrarProductoComponent } from './mostrar-producto/mostrar-producto.component';


@NgModule({
  declarations: [
    AgregarEditarProductoComponent,
    MostrarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoViewRoutingModule
  ]
})
export class ProductoViewModule { }
