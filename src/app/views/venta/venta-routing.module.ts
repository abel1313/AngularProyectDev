import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarVentasComponent } from './agregar-editar-ventas/agregar-editar-ventas.component';
import { MostrarVentasComponent } from './mostrar-ventas/mostrar-ventas.component';

const routes: Routes = [

  { path: '', component: MostrarVentasComponent },
  { path: 'nuevo', component: AgregarEditarVentasComponent },
  { path: 'mostrar', component: MostrarVentasComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
