import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteViewRoutingModule } from './cliente-view-routing.module';
import { MostrarClientesComponent } from './mostrar-clientes/mostrar-clientes.component';
import { AgregarEditarLientesComponent } from './agregar-editar-lientes/agregar-editar-lientes.component';
import { PersonaModule } from '../persona/persona.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MostrarClientesComponent,
    AgregarEditarLientesComponent
  ],
  imports: [
    CommonModule,
    ClienteViewRoutingModule,
    PersonaModule,
    SharedModule
  ]
})
export class ClienteViewModule { }
