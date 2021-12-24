import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarUsuariosComponent } from '../usuario-view/mostrar-usuarios/mostrar-usuarios.component';
import { AgregarEditarEmpleadosComponent } from './agregar-editar-empleados/agregar-editar-empleados.component';
import { MostrarEmpleadosComponent } from './mostrar-empleados/mostrar-empleados.component';

const routes: Routes = [

  { path: '', component: MostrarEmpleadosComponent },
  { path: 'nuevo', component: AgregarEditarEmpleadosComponent },
  { path: 'mostrar', component: MostrarEmpleadosComponent }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
