import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioViewRoutingModule } from './usuario-view-routing.module';
import { MostrarUsuariosComponent } from './mostrar-usuarios/mostrar-usuarios.component';
import { AgregarEditarUsuariosComponent } from './agregar-editar-usuarios/agregar-editar-usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    MostrarUsuariosComponent,
    AgregarEditarUsuariosComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuarioViewRoutingModule,
    SharedModule
  ],
  exports: [
    AgregarEditarUsuariosComponent
  ]
})
export class UsuarioViewModule { }
