import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarViewComponent } from './eliminar-view/eliminar-view.component';

const routes: Routes = [
  { path: '', component: EliminarViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EliminarRoutingModule { }
