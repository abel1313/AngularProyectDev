import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.formPersonaCliente = this.fb.group({
      nombrePersona: ['',[Validators.required] ]
    });

    if(this.formPersonaCliente.valid)
    {
      console.log('valido ')
    }
  }

}
