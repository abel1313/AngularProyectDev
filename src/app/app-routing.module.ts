import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path: 'sistema',
    loadChildren: () => import('../app/views/acceder-sistema/acceder-sistema.module')
    .then(acceder => acceder.AccederSistemaModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('../app/views/pedidos/pedidos.module')
    .then(pedido => pedido.PedidosModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('../app/views/empleados/empleados.module')
    .then(empleado => empleado.EmpleadosModule)
  },
  {
    path: 'venta',
    loadChildren: () => import('../app/views/venta/venta.module')
    .then(venta => venta.VentaModule)
  },
  {
    path: '',
    loadChildren: () => import('../app/views/producto-view/producto-view.module')
    .then(producto => producto.ProductoViewModule)
  },
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
  },
  {
    path: 'eliminar',
    loadChildren: () => import('../app/views/eliminar/eliminar.module')
    .then(usuario => usuario.EliminarModule)
  },
  {
    path: 'graficas',
    loadChildren: () => import('../app/views/graficas/graficas.module')
    .then(usuario => usuario.GraficasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
