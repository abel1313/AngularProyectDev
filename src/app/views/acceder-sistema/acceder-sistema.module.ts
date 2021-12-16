import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccederSistemaRoutingModule } from './acceder-sistema-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AccederViewComponent } from './acceder-view/acceder-view.component';
import { UsuarioViewModule } from '../usuario-view/usuario-view.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent,
    AccederViewComponent
  ],
  imports: [
    CommonModule,
    AccederSistemaRoutingModule,
    SharedModule,
    UsuarioViewModule
  ]
})
export class AccederSistemaModule { }
