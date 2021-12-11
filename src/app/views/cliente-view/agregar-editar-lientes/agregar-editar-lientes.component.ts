import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICliente, IMensajeRespuesta, MensajeFactory, UrlApiREST } from 'src/app/models';
import { IDireccion } from 'src/app/models/Clientes/IDireccion';
import { IPersona } from 'src/app/models/Clientes/IPersona';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { PipeFechaPipe } from 'src/app/shared/pipe-fecha.pipe';
import { Mensaje } from '../../models';

@Component({
  selector: 'app-agregar-editar-lientes',
  templateUrl: './agregar-editar-lientes.component.html',
  styleUrls: ['./agregar-editar-lientes.component.scss']
})
export class AgregarEditarLientesComponent implements OnInit {

  subscription: Subscription;
  fecha = new Date();

  soloLetras: string = '[a-zA-Z ]{2,10}';
  soloNumeros: string = '[0-9]{3,10}';

  soloLetrasNumeros: string = '^[A-Za-z0-9]+$';

  datosClienteFormGroup: FormGroup;
  datosClienteDireccionFormGroup: FormGroup;
  mostrarFormularios: Boolean;

  tituloCliente: string = 'Nuevo cliente';
  tituloDireccionCliente: string = 'Nueva dirección del cliente';



  constructor(
    private fb: FormBuilder, 
    private service: ServicesGenericosService,
    private ngZone: NgZone, private router: Router) {
    
      this.subscription = new Subscription();
    this.mostrarFormularios = false;
  }

  ngOnInit(): void {
    let url: string = 'personas';
    this.subscription.add(this.service.productos(url).subscribe(res => {
      console.log(res)
      console.log(JSON.stringify(res))
    }, err => console.log(err)))

    this.datosClienteFormGroup = this.fb.group({
      nombrePersona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apeidoPaternoPersona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apeidoMaternoPersona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      fechaNacimiento: ['', [Validators.required]],
      generoPersona: ['', [Validators.required]]
    });

    this.datosClienteDireccionFormGroup = this.fb.group({
      calleDireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      coloniaDireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      numeroInterior: ['', [Validators.minLength(0), Validators.maxLength(10)]],
      numeroExterior: ['', [Validators.minLength(0), Validators.maxLength(10)]],
      codigoPostalDireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      estadoDireccion: ['', [Validators.required]]
    });


    //   this.formCliente = new FormGroup({
    //     nombrePersonaCliente: new FormControl('', Validators.required),
    //     apeidoPaternoPersonaCliente: new FormControl('', Validators.required),
    //     apeidoMaternoPersonaCliente: new FormControl('', Validators.required),
    //     generoPersonaCliente: new FormControl('', Validators.required),
    //  });




  }

  guardar(): void {
    if (this.datosClienteFormGroup.valid) {
      this.mostrarFormularios = !this.mostrarFormularios;
  
    }
  }

  guardarDireccion(): void {
    let persona: IPersona = this.datosClienteFormGroup.value;
    let iDireccion: IDireccion = (this.datosClienteDireccionFormGroup.value);
    persona.direccion = iDireccion;
    console.log(iDireccion, ' idor')
    let cliente: ICliente =
    {
      personaCliente: persona
    }

    this.service.guardarCliente(UrlApiREST.GUARDAR_CLIENTE, cliente).subscribe((res)=>{
      
      let codigoRespuesta: IMensajeRespuesta = null as any;
      let mostrarMensaje: string = null as any;

      if( res.code === '200 OK' )
      {
           codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue) ;
           mostrarMensaje = codigoRespuesta.mostrarMensaje(res);
  
          Mensaje.mensaje('Mensaje',`${mostrarMensaje}`, 'success','Aceptar');
          this.ngZone.run(()=>{
            this.router.navigate(['/clientes/mostrar']);
          });
        
      }else
      {
        Mensaje.mensaje('Mensaje',`Error al guardar un cliente`, 'success','Aceptar');
      }
    },err=> {
      
      console.log(err, ' ERRRROOOOOORRR')});
    persona.fechaNacimiento = new PipeFechaPipe().transform(this.datosClienteFormGroup.get('fechaNacimiento')?.value);

    console.log(cliente , ' iPersona ', this.datosClienteDireccionFormGroup.value);
  }

  cancelarDireccion(): void {
    this.mostrarFormularios = false;
  }

}
