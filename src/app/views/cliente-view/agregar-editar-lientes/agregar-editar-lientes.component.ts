import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente, ICliente, IDatosMostrar, IMensajeRespuesta, IRespuestaDTO, MensajeFactory, Permisos, UrlApiREST } from 'src/app/models';
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
export class AgregarEditarLientesComponent implements OnInit, OnDestroy {
@Input()  tituloCliente: string = '';
@Input() clienteEditar: IDatosMostrar;
  subscription: Subscription;
  fecha = new Date();

  load: Boolean = false;

  minimoCarcateres: number = 3;
  maximoCarcateres: number = 10;

  soloLetras: string = '[a-zA-Z ]{2,10}';
  soloNumeros: string = '[0-9]{3,10}';
  soloLetrasNumeros: string = '^[A-Za-z0-9]+$';

  datosClienteFormGroup: FormGroup;
  datosClienteDireccionFormGroup: FormGroup;
  mostrarFormularios: Boolean;

  

 
  tituloDireccionCliente: string = 'Nueva dirección del cliente';


  permisosMostrar: Array<number> = [];

  constructor(
    private fb: FormBuilder, 
    private service: ServicesGenericosService,
    private ngZone: NgZone, private router: Router) {
    
      this.subscription = new Subscription();
    this.mostrarFormularios = false;

    this.tituloCliente = 'Nuevo Cliente';
    
  }


  ngOnInit(): void {
    let url: string = 'personas';
    this.subscription.add(this.service.productos(url).subscribe(res => {

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


this.obtenerClienteEditar();

       this.permisosMostrar = Permisos.localStorageSession( localStorage.getItem("session") as any);
    if(this.permisosMostrar.length === 0)
    {
      this.ngZone.run(()=>{this.router.navigate(['/sistema'])});
    }

  }

  obtenerClienteEditar(): void
  {
    if( this.clienteEditar === undefined )
    {
      this.clienteEditar = Cliente.inicializarIMostrarDatos;
    }else
      if(this.clienteEditar.id !== null && this.clienteEditar.id !== undefined)
      {
        this.load = true;
        this.service.buscarId<IRespuestaDTO<ICliente>>
        (this.clienteEditar.id,UrlApiREST.OBTENER_CLIENTE_ID)
        .subscribe((res)=>{

          let codigoRespuesta: IMensajeRespuesta = null as any;
          let mostrarMensaje: string = null as any;
          this.datosClienteFormGroup.get('nombrePersona')?.setValue(res.t.personaCliente.nombrePersona);
          this.datosClienteFormGroup.get('apeidoPaternoPersona')?.setValue(res.t.personaCliente.apeidoPaternoPersona);
          this.datosClienteFormGroup.get('apeidoMaternoPersona')?.setValue(res.t.personaCliente.apeidoMaternoPersona);
          this.datosClienteFormGroup.get('fechaNacimiento')?.setValue(res.t.personaCliente.fechaNacimiento);
          this.datosClienteFormGroup.get('generoPersona')?.setValue(res.t.personaCliente.generoPersona);
          
          this.datosClienteDireccionFormGroup.get('calleDireccion')?.setValue(res.t.personaCliente.direccion.calleDireccion);
          this.datosClienteDireccionFormGroup.get('coloniaDireccion')?.setValue(res.t.personaCliente.direccion.coloniaDireccion);
          this.datosClienteDireccionFormGroup.get('numeroInterior')?.setValue(res.t.personaCliente.direccion.numeroInterior);
          this.datosClienteDireccionFormGroup.get('numeroExterior')?.setValue(res.t.personaCliente.direccion.numeroExterior);
          this.datosClienteDireccionFormGroup.get('codigoPostalDireccion')?.setValue(res.t.personaCliente.direccion.codigoPostalDireccion);
          this.datosClienteDireccionFormGroup.get('estadoDireccion')?.setValue(res.t.personaCliente.direccion.estadoDireccion);
         
          if(res.code === '200 OK')
          {
            this.load = false;
            
            codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue) ;
            mostrarMensaje = codigoRespuesta.mostrarMensaje(res);
   
          //  Mensaje.mensaje('Mensaje',`${mostrarMensaje}`, 'success','Aceptar');

          }

        },
        err=>
        {
          this.load = false; 
          console.log(err) 
        }
         );
 
      }

  }

  guardar(): void {
    if (this.datosClienteFormGroup.valid) {
      this.mostrarFormularios = !this.mostrarFormularios;
    }
  }

  guardarDireccion(): void {

    let cliente: ICliente=  Cliente.incializarCliente;

    let persona: IPersona = this.datosClienteFormGroup.value;
    persona.fechaNacimiento = new PipeFechaPipe().transform(new Date(this.datosClienteFormGroup.get('fechaNacimiento')?.value));

    let iDireccion: IDireccion = (this.datosClienteDireccionFormGroup.value);
    persona.direccion = iDireccion;
    
 

    if( this.tituloCliente === 'Editar Cliente' )
    {
      cliente = 
      {
        id: this.clienteEditar.id,
        personaCliente: persona,
      }
    }else
    {
      cliente = 
      {
        id: 0,
        personaCliente: persona,
      }
    }
    this.guardarCliente(cliente);
  }





  ediarCliente(cliente : ICliente): void
  {

    this.service.actualizarCliente(UrlApiREST.EDITAR_CLIENTE, cliente).subscribe((res)=>{
      
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
  }
  guardarCliente( cliente: ICliente): void
  {
      this.service.guardarCliente(UrlApiREST.GUARDAR_CLIENTE, cliente).subscribe((res)=>{
      
        let codigoRespuesta: IMensajeRespuesta = null as any;
        let mostrarMensaje: string = null as any;
  
        if( res.code === '200 OK' )
        {
             codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue) ;
             mostrarMensaje = codigoRespuesta.mostrarMensaje(res);
    
            Mensaje.mensaje('Mensaje',`${mostrarMensaje}`, 'success','Aceptar');
            this.mostrarFormularios = false;
            this.tituloCliente = 'Nuevo Cliente';
            this.datosClienteFormGroup.reset();
            this.datosClienteDireccionFormGroup.reset();
        }else
        {
          Mensaje.mensaje('Mensaje',`Error al guardar un cliente`, 'success','Aceptar');
        }
      },err=> {
        
        console.log(err, ' ERRRROOOOOORRR')});
    }
 
  

  cancelarDireccion(): void {
    this.mostrarFormularios = false;
  }


  ngOnDestroy(): void {
    
          this.subscription.unsubscribe();
  }

}
