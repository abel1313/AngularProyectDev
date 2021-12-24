import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { MostrarEmpleadosComponent } from './mostrar-empleados/mostrar-empleados.component';
import { AgregarEditarEmpleadosComponent } from './agregar-editar-empleados/agregar-editar-empleados.component';


@NgModule({
  declarations: [
    MostrarEmpleadosComponent,
    AgregarEditarEmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
