import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarProductoComponent } from '../producto-view/agregar-editar-producto/agregar-editar-producto.component';
import { AgregarEditarLientesComponent } from './agregar-editar-lientes/agregar-editar-lientes.component';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';

const routes: Routes = 
[
  { path: '', component: AgregarEditarLientesComponent },
  { path: 'mostrar', component: MostrarClientesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteViewRoutingModule { }
