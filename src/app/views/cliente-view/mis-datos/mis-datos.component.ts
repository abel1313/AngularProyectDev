import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente, IBuscarId, 
  ICliente, 
  IClienteDTO, 
  IClienteUsuario, 
  IMensajeRespuesta, 
  InicializarUsuario,
  IRespuestaDTO, 
  IUsuarioRespuesta, 
  MensajeFactory, 
  Permisos, 
  UrlApiREST,
  Persona,
  IPersonaSin
} from 'src/app/models';
import { IPersona } from 'src/app/models/Persona';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { Mensaje } from '../../models';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss']
})
export class MisDatosComponent implements OnInit, OnDestroy {

  permisosMostrar: Array<number> = [];
  tipoUsuario: string = '';
  usuarioSesion: Array<IUsuarioRespuesta> = [];
  usuarioNav: string = '';

  subscription: Subscription;
  iClienteDatos: IClienteUsuario;

  load: Boolean = false;
  minimoCarcateres: number = 3;
  maximoCarcateres: number = 10;

  soloLetras: string = '[a-zA-Z ]{2,10}';
  soloNumeros: string = '[0-9]{3,10}';
  soloLetrasNumeros: string = '^[A-Za-z0-9]+$';

  misDatosClienteFormGroup: FormGroup;
  misDatosClienteDireccionFormGroup: FormGroup;



  constructor( 
    
    private fb: FormBuilder,
    private service: ServicesGenericosService, 
    private router: Router,
     private _ngZone: NgZone
     ) {
       this.subscription = new Subscription();
      }


  ngOnInit(): void {


    this.misDatosClienteFormGroup = this.fb.group({
      id: [''],
      nombrePersona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apeidoPaternoPersona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apeidoMaternoPersona: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      fechaNacimiento: ['', [Validators.required]],
      generoPersona: ['', [Validators.required]]
    });

    this.misDatosClienteDireccionFormGroup = this.fb.group({
      id: [''],
      calleDireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      coloniaDireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      numeroInterior: ['', [Validators.minLength(0), Validators.maxLength(10)]],
      numeroExterior: ['', [Validators.minLength(0), Validators.maxLength(10)]],
      codigoPostalDireccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      estadoDireccion: ['', [Validators.required]]
    });

    this.permisosMostrar = Permisos.localStorageSession( localStorage.getItem("session") as any);
    this.usuarioNav = Permisos.userNav( localStorage.getItem("session") as any);
    this.usuarioSesion = JSON.parse(localStorage.getItem("session") as any);
    this.tipoUsuario = Permisos.tipoUsuario(this.permisosMostrar);

    if( !this.permisosMostrar.includes(3) && this.usuarioNav === 'admin' )
    {
      this._ngZone.run(() => { this.router.navigate(['/venta']) });
    }
    if (this.permisosMostrar.length === 0) {
      this._ngZone.run(() => { this.router.navigate(['/sistema']) });
    }
    
    this.obtenerMsDatos();
  }

  guardarMisDatos(): void
  {
    console.log(this.misDatosClienteFormGroup.value, ' diste');
  }
  guardarMisDatosDireccion(): void
  {

  }
  obtenerMsDatos()
  {
    const datos: IBuscarId = {id: 0};
    if( this.usuarioSesion[0].id !== undefined && this.usuarioSesion[0].id !== null )
    {
      this.iClienteDatos = InicializarUsuario.inicializarClienteUsuario;
       datos.id = this.usuarioSesion[0].id;
       this.subscription.add(this.service.genericoPost<IBuscarId, IRespuestaDTO<IClienteUsuario>>
        (
          UrlApiREST.OBTENER_DATOS_CLIENTES, datos
        ).subscribe((res)=>{

          let codigoRespuesta: IMensajeRespuesta = null as any;
          let mostrarMensaje: string = null as any;
    
          if( res.code === '200 OK' )
          {
               codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue) ;
               mostrarMensaje = codigoRespuesta.mostrarMensaje(res);
            if(res.codeValue === 200 )
            {
              this.iClienteDatos = res.t;
              const convertir: IPersonaSin = Persona.convertirPersona(this.iClienteDatos.cliente?.personaCliente as any);
              console.log(this.iClienteDatos.cliente?.personaCliente);
              this.misDatosClienteFormGroup.setValue(convertir);
             Mensaje.mensaje('Mensaje',`${mostrarMensaje}`, 'success','Aceptar');
             this.misDatosClienteDireccionFormGroup.setValue(this.iClienteDatos.cliente?.personaCliente.direccion as any);
             console.log(this.misDatosClienteDireccionFormGroup.value);
            }
          }else
          {
            Mensaje.mensaje('Mensaje',`Error al guardar un cliente`, 'success','Aceptar');
          }

      
      },(err)=>{}) );


    }


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
