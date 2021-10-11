import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';

const routes: Routes = 
[
  { path: '', component: MostrarClientesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteViewRoutingModule { }
