import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarPedidosComponent } from './pedidos-view/agregar-editar-pedidos/agregar-editar-pedidos.component';
import { MostrarPedidosComponent } from './pedidos-view/mostrar-pedidos/mostrar-pedidos.component';

const routes: Routes = 
[
  { path: '', component: MostrarPedidosComponent },
  { path: 'nuevo', component: AgregarEditarPedidosComponent },
  { path: 'mostrar', component: MostrarPedidosComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
