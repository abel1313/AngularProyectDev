import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Permisos } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  
  permisosMostrar: Array<number> = [];
  constructor(

    private fb: FormBuilder,
    private service: ServicesGenericosService,
    private ngZone: NgZone, private router: Router
  ) { }

  ngOnInit(): void {
    
        this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length > 0) {
      console.log(' ;;leha');
      this.ngZone.run(() => { this.router.navigate(['/venta']) });
    }
  }

}
