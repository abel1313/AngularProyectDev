import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoViewRoutingModule } from './producto-view-routing.module';
import { AgregarEditarProductoComponent } from './agregar-editar-producto/agregar-editar-producto.component';
import { MostrarProductoComponent } from './mostrar-producto/mostrar-producto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosComponent } from './productos/productos.component';


@NgModule({
  declarations: [
    AgregarEditarProductoComponent,
    MostrarProductoComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ProductoViewRoutingModule,
    SharedModule
  ]
})
export class ProductoViewModule { }
