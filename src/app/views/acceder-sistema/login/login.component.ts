import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICliente, IMensajeRespuesta, InicializarUsuario, IRespuestaDTO, IUsuario, IUsuarioRespuesta, MensajeFactory, Permisos, UrlApiREST } from 'src/app/models';
import { ServicesGenericosService } from 'src/app/service/services-genericos.service';
import { Patron } from 'src/app/shared/Patron';
import { Mensaje } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  datosUsuario: FormGroup;
  minimoCarcateres: number = 3;
  maximoCarcateres: number = 10;

  soloLetras: string = '';
  load: Boolean = false;

  iUsuario: IUsuario;


  permisosMostrar: Array<number> = [];

  constructor(
    private fb: FormBuilder,
    private service: ServicesGenericosService,
    private ngZone: NgZone, private router: Router) {

    this.subscription = new Subscription();
    this.soloLetras = Patron.SOLO_LETRAS;


  }

  ngOnInit(): void {

    this.datosUsuario = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasenaUsuario: ['', [Validators.required]]
    });



    this.permisosMostrar = Permisos.localStorageSession(localStorage.getItem("session") as any);
    if (this.permisosMostrar.length > 0) {
      this.ngZone.run(() => { this.router.navigate(['/venta']) });
    }

  }

  registrarSistema(): void {
    this.router.navigate(['sistema/registrar']);
  }

  accederSistema(): void {
    this.iUsuario = InicializarUsuario.inicializarUsuario;
    this.iUsuario = this.datosUsuario.value;
    this.load = true;
    this.subscription.add(this.service.genericoPost<IUsuario, IRespuestaDTO<Array<IUsuarioRespuesta>>>
      (UrlApiREST.ACCEDER_SISTEMA, this.iUsuario).subscribe((res) => {

        let codigoRespuesta: IMensajeRespuesta = null as any;
        let mostrarMensaje: string = null as any;

        if (res.code === '200 OK') {
          console.log(res, " log");
          codigoRespuesta = MensajeFactory.obtenereMensaje(res.codeValue);
          mostrarMensaje = codigoRespuesta.mostrarMensaje(res);

          if (res.codeValue === 200) {
            this.service.permisos$.emit(res.t);
            localStorage.setItem("session", JSON.stringify(res.t));

            this.load = false;
            Mensaje.mensaje('Mensaje', `${mostrarMensaje}`, 'success', 'Aceptar');
            this.router.navigate(['productos/mostrar']);
          } else {

            this.load = false;
            Mensaje.mensaje('Mensaje', `${mostrarMensaje}`, 'success', 'Aceptar');

          }

        } else {

          this.load = false;
          Mensaje.mensaje('Mensaje', `Error al guardar un cliente`, 'success', 'Aceptar');
        }


      }, err => {

        this.load = false;
        console.log(err, " aui estamos")

      }));

  }


  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }

  }

}
