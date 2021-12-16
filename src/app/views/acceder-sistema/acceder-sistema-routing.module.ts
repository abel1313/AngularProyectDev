import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'acceder', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccederSistemaRoutingModule { }
