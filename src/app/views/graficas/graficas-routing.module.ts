import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficasTortilleriaComponent } from './graficas-tortilleria/graficas-tortilleria.component';

const routes: Routes = [
  { path: '', component: GraficasTortilleriaComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficasRoutingModule { }
