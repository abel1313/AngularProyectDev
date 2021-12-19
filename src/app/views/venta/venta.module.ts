import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { MostrarVentasComponent } from './mostrar-ventas/mostrar-ventas.component';
import { AgregarEditarVentasComponent } from './agregar-editar-ventas/agregar-editar-ventas.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MostrarVentasComponent,
    AgregarEditarVentasComponent
  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    SharedModule
  ]
})
export class VentaModule { }
