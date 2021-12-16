import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarUsuariosComponent } from './agregar-editar-usuarios/agregar-editar-usuarios.component';
import { MostrarUsuariosComponent } from './mostrar-usuarios/mostrar-usuarios.component';

const routes: Routes = [
  { path: '', component: AgregarEditarUsuariosComponent },
  { path: 'mostrar', component: MostrarUsuariosComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioViewRoutingModule { }
