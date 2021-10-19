import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EliminarRoutingModule } from './eliminar-routing.module';
import { EliminarViewComponent } from './eliminar-view/eliminar-view.component';


@NgModule({
  declarations: [
    EliminarViewComponent
  ],
  imports: [
    CommonModule,
    EliminarRoutingModule
  ],
  exports: [
    EliminarViewComponent
  ]
})
export class EliminarModule { }
