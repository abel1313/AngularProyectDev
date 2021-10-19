import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonaComponent } from './datos-persona/datos-persona.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DatosPersonaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DatosPersonaComponent
  ]
})
export class PersonaModule { }
