import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './mostrar-producto/mostrar-producto.component';

import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'mostrar', component: MostrarProductoComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoViewRoutingModule { }
