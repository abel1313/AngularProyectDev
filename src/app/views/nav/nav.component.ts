import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPermisos, IUsuarioRespuesta, Permisos } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  totalVenta: number = 0; 
  subscription: Subscription;

  permisos: Array<IPermisos> = [];

  
  session: Array<IUsuarioRespuesta>  = [];

  permisosMostrar: Array<number> = [];
  tipoUsuario: string = '';
  usuarioSesion: Array<IUsuarioRespuesta> = [];
  usuarioNav: string = '';


  constructor( private service: ServicesGenericosService,
    private ngZone: NgZone,
    private router: Router ) { 
    this.subscription = new Subscription();
  }
 
  ngOnInit(): void {

    this.mostrarTotalNav();
    this.obtenerPermisos();

    this.permisosMostrar = Permisos.localStorageSession( localStorage.getItem("session") as any);
    this.usuarioNav = Permisos.userNav( localStorage.getItem("session") as any);
    
    this.usuarioSesion = localStorage.getItem("session") as any;

    this.tipoUsuario = Permisos.tipoUsuario(this.permisosMostrar);
    
  }

  salir(event: any): void
  {
    event.preventDefault();
    localStorage.removeItem('session');
    this.ngZone.run(()=>{
      this.tipoUsuario = '';
      this.permisosMostrar = [];
      this.usuarioNav = '';
      this.router.navigate(['sistema']);});

  }
  obtenerPermisos(): void
  {
    this.subscription.add(this.service.permisos$.subscribe((res)=>{
      this.usuarioNav = res[0].nombreUsuario;

      this.permisos = res[0].permisos;

     this.permisosMostrar = Permisos.mapPermisos(this.permisos);
      
      console.log(this.permisosMostrar, ' name');

    },(error)=>{}) );
  }

  mostrarTotalNav(): void
  {
this.subscription.add(this.service.totalNav$.subscribe((tot: number)=>{
  this.totalVenta += tot;
}));
  }

  mostrarClientes(): void
  {
      this.service.mostrarProductos$.emit(false);
  }
  mostrarUsuarios(): void
  {
      this.service.mostrarProductos$.emit(false);
  }

  mostrarVenta(): void
  {
    this.service.mostrarProductos$.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
