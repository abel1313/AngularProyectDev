import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path: 'clientes',
    loadChildren: () => import('../app/views/cliente-view/cliente-view.module')
    .then(cliente => cliente.ClienteViewModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('../app/views/producto-view/producto-view.module')
    .then(producto => producto.ProductoViewModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('../app/views/usuario-view/usuario-view.module')
    .then(usuario => usuario.UsuarioViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
