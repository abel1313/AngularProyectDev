import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccederSistemaRoutingModule } from './acceder-sistema-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    AccederSistemaRoutingModule,
    SharedModule
  ]
})
export class AccederSistemaModule { }
