import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';

import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { PipeFechaPipe } from './pipe-fecha.pipe';
import { Patron } from './Patron';
import { PipeFechaPersonalizadaPipe } from './pipe-fecha-personalizada.pipe';



@NgModule({
  declarations: [ 
    
    PipeFechaPipe, 
    PipeFechaPersonalizadaPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatSliderModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
    
    
    
  ],exports:
  [
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatSliderModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    PipeFechaPipe,
    PipeFechaPersonalizadaPipe
    
    
    
  ]
})
export class SharedModule { }
