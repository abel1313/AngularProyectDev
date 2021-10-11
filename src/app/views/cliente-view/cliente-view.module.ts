import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteViewRoutingModule } from './cliente-view-routing.module';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';
import { AgregarEditarLientesComponent } from './agregar-editar-lientes/agregar-editar-lientes.component';


@NgModule({
  declarations: [
    MostrarClientesComponent,
    AgregarEditarLientesComponent
  ],
  imports: [
    CommonModule,
    ClienteViewRoutingModule
  ]
})
export class ClienteViewModule { }
