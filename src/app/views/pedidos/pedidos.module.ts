import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { AgregarEditarPedidosComponent } from './pedidos-view/agregar-editar-pedidos/agregar-editar-pedidos.component';
import { MostrarPedidosComponent } from './pedidos-view/mostrar-pedidos/mostrar-pedidos.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MostrarPedidosComponent,
    AgregarEditarPedidosComponent,
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule
  ]
})
export class PedidosModule { }
