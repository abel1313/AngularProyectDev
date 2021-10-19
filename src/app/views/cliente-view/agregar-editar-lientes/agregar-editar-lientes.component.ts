import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-editar-lientes',
  templateUrl: './agregar-editar-lientes.component.html',
  styleUrls: ['./agregar-editar-lientes.component.scss']
})
export class AgregarEditarLientesComponent implements OnInit {

  formCliente: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void 
  {
    this.formCliente = this.fb.group({
 
    });


  //   this.formCliente = new FormGroup({
  //     nombrePersonaCliente: new FormControl('', Validators.required),
  //     apeidoPaternoPersonaCliente: new FormControl('', Validators.required),
  //     apeidoMaternoPersonaCliente: new FormControl('', Validators.required),
  //     generoPersonaCliente: new FormControl('', Validators.required),
  //  });

    


  }

  guardar(): void
  {
    console.log( this.formCliente.controls.got.value, "\n" ,this.formCliente, ' Diste' );
  }

}
