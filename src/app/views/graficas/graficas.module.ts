import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficasRoutingModule } from './graficas-routing.module';
import { GraficasTortilleriaComponent } from './graficas-tortilleria/graficas-tortilleria.component';


import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    
    GraficasTortilleriaComponent,
  ],
  imports: [
    CommonModule,
    GraficasRoutingModule,
    ChartsModule
  ]
})
export class GraficasModule { }
