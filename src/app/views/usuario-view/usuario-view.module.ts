import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioViewRoutingModule } from './usuario-view-routing.module';
import { MostrarUsuariosComponent } from './mostrar-usuarios/mostrar-usuarios.component';
import { AgregarEditarUsuariosComponent } from './agregar-editar-usuarios/agregar-editar-usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MostrarUsuariosComponent,
    AgregarEditarUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuarioViewRoutingModule,
    SharedModule
  ]
})
export class UsuarioViewModule { }
