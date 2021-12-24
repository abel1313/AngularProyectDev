import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permisos } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-mostrar-empleados',
  templateUrl: './mostrar-empleados.component.html',
  styleUrls: ['./mostrar-empleados.component.scss']
})
export class MostrarEmpleadosComponent implements OnInit {



  permisosMostrar: Array<number> = [];

  constructor(
    private service: ServicesGenericosService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length === 0) {
      this.ngZone.run(() => { this.router.navigate(['/sistema']) });
    }

  }

}
