import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { ICliente, IMensajeRespuesta, InicializarUsuario, IPermisos, IRegistrarUsuario, IRespuestaDTO, IUsuario, IUsuarioRespuesta, IVista, IVistaCheck, MensajeFactory, Permisos, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { Mensaje } from '../../models';

@Component({
  selector: 'app-agregar-editar-usuarios',
  templateUrl: './agregar-editar-usuarios.component.html',
  styleUrls: ['./agregar-editar-usuarios.component.scss']
})
export class AgregarEditarUsuariosComponent implements OnInit, OnDestroy {
@Input() enviarUsuarioEditar: IUsuarioRespuesta;


  subscription: Subscription;
  soloLetras: string = '[a-zA-Z ]{2,10}';
  soloNumeros: string = '[0-9]{3,10}';
  soloLetrasNumeros: string = '^[A-Za-z0-9]+$';
  datosUsuarioFormGroup: FormGroup;
  maximoCarcateres: number = 15;
  minimoCarcateres: number = 3;
  load: Boolean = false;


  mostrarMensaje: Boolean = false;

  ocultarPermisos: Boolean = false;
  iVista: Array<IVistaCheck> = [];

  
  permisosMostrar: Array<number> = [];


  seleccionarCheckGuardar: Array<IVistaCheck> = [];

  constructor(private fb: FormBuilder,
    private service: ServicesGenericosService,
    private ngZone: NgZone, private router: Router) {

    this.subscription = new Subscription();
  }


  ngOnInit(): void {

          this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length === 0) {
      this.ngZone.run(() => { this.router.navigate(['/sistema']) });
    }

    this.ocultarPermisos = this.router.url === '/sistema/registrar' ? true: false;

    this.datosUsuarioFormGroup = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      contrasenaUsuario: ['', [Validators.required, Validators.minLength(3)]],
      confirmarContrasenaUsuario: ['', [Validators.required, Validators.minLength(3)]],
    });

    if(this.enviarUsuarioEditar !== null )
    {
      if( this.enviarUsuarioEditar !== null && this.enviarUsuarioEditar !== undefined )
      {
        this.datosUsuarioFormGroup.get('nombreUsuario')?.setValue( this.enviarUsuarioEditar.nombreUsuario);
      }
        
    }
    this.cargarVistas();
    
  }


  iniciarSesion(): void
  {
    this.ngZone.run(()=>{
      this.router.navigate(['sistema']);
    });
    
  }

  seleccionarCheck(item: IVistaCheck, check: any, i: number): void {

    if (check.target.checked) {
      this.iVista[i].isCheck = true;
    } else {
      this.iVista[i].isCheck = false;
    }

    console.log(this.iVista, ' vista sola ')
  }
  cargarVistas(): void {
    this.subscription.add(this.service.obtenerVistas(UrlApiREST.OBTENER_VISTAS).subscribe((res) => {
      this.iVista = res.t;
    }, (err: any) => { console.log(err) }));
  }
  guardarUsuario(): void {
    const registrarUsuaerio: IRegistrarUsuario = this.datosUsuarioFormGroup.value;
    let usuario: IUsuario = InicializarUsuario.inicializarUsuario;

    if (registrarUsuaerio.contrasenaUsuario === registrarUsuaerio.confirmarContrasenaUsuario) {
      usuario =
      {
        nombreUsuario: registrarUsuaerio.nombreUsuario,
        contrasenaUsuario: registrarUsuaerio.contrasenaUsuario,
        permisos: []
      }

      let perm: IPermisos[][] = this.iVista.filter((m: IVistaCheck) => m.isCheck).map((m: IVistaCheck) => {
        let permisos: IPermisos[] = [];

        let datos: IVista =
        {
          id: m.id,
          nombreVista: m.nombreVista
        }
        let permiso: IPermisos =
        {
          vista: datos
        };
        permisos.push(permiso);

        return permisos;
      });

      perm.map((datos: Array<IPermisos>) => {
        datos.forEach((dts: IPermisos) => {
          let per: IPermisos =
          {
            vista: dts.vista
          }
          usuario.permisos?.push(per)
        });
      });

      console.log(usuario)
      this.load = true;
      this.subscription.add
        (this.service
          .genericoPost<IUsuario, IRespuestaDTO<Boolean>>
          (UrlApiREST.REGISTRAR_USUARIO_PERMISOS, usuario).subscribe
          (usuario => {

            let codigoRespuesta: IMensajeRespuesta = null as any;
            let mostrarMensaje: string = null as any;

            if (usuario.code === '200 OK') {
              this.load = false;
              codigoRespuesta = MensajeFactory.obtenereMensaje(usuario.codeValue);
              mostrarMensaje = codigoRespuesta.mostrarMensaje(usuario);

              Mensaje.mensaje('Mensaje', `${mostrarMensaje}`, 'success', 'Aceptar');

              this.datosUsuarioFormGroup.reset();
              this.cargarVistas();

            } else {
              this.load = false;
              Mensaje.mensaje('Mensaje', `Error al guardar un cliente`, 'success', 'Aceptar');
            }





          }, (err: any) => {
            this.load = false;
          }));
      this.mostrarMensaje = false;
    } else {
      this.mostrarMensaje = true;
    }
  }
  ngOnDestroy(): void {
    if (this.subscription !== null)
    {
      console.log(' entro agregar')
      this.subscription.unsubscribe();
    }
  }


  otro() {
    console.log(this.datosUsuarioFormGroup.value)
  }
}
