import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Permisos } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-datos-persona',
  templateUrl: './datos-persona.component.html',
  styleUrls: ['./datos-persona.component.scss']
})
export class DatosPersonaComponent implements OnInit {

 formPersonaCliente: FormGroup;
 @Input() nombrePersona: string;
 @Input() apeidoPaternoPersona: string;
 @Input() apeidoMaternoPersona: string;
 @Input() generoPersona: string;

 
 
  tituloPersona: string = 'Datos personales';

  permisosMostrar: Array<number> = [];

  constructor( 
    private fb: FormBuilder,
    private service: ServicesGenericosService,
    private ngZone: NgZone,
    private router: Router
     ) { }

  ngOnInit(): void {

    this.formPersonaCliente = this.fb.group({
      nombrePersona: ['',[Validators.required] ]
    });

    if(this.formPersonaCliente.valid)
    {
      console.log('valido ')
    }
        this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length === 0) {
      this.ngZone.run(() => { this.router.navigate(['/sistema']) });
    }
  }

}
