import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';

@Component({
  selector: 'app-agregar-editar-lientes',
  templateUrl: './agregar-editar-lientes.component.html',
  styleUrls: ['./agregar-editar-lientes.component.scss']
})
export class AgregarEditarLientesComponent implements OnInit {

  formCliente: FormGroup;

  isLinear = false;
  datosPersonaFormGroup: FormGroup;
  datosDireccionFormGroup: FormGroup;
  subscription: Subscription;

  constructor( private fb: FormBuilder, private service: ServicesGenericosService) {
    this.subscription = new Subscription();
   }

  ngOnInit(): void 
  {
    let url: string = 'personas';
      this.subscription.add(this.service.productos(url).subscribe(res=>{
        console.log(res)
      console.log(JSON.stringify(res))
      }, err=> console.log(err) ) )
    this.formCliente = this.fb.group({
 
    });


    this.datosPersonaFormGroup = this.fb.group({
      nombrePersona: ['', Validators.required],
      apeidoPaternoPersona: ['', Validators.required],
      apeidoMaternoPersona: ['', Validators.required],
      generoPersona: ['', Validators.required]

      
    });
    this.datosDireccionFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
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
