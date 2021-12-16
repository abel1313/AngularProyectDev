import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { EventEmitter, Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ICliente, IDatosMostrar, IRespuestaDTO, IVista, IVistaCheck } from '../models';
import { IProducto } from '../views/models';

@Injectable({
  providedIn: 'root'
})
export class ServicesGenericosService {

  url: string = 'http://192.168.56.1:8080/proyecto';

  editarProducto$ = new EventEmitter<string>();
  editarProductoAgregar$ = new EventEmitter<IProducto>();
  mostrarProductos$ = new EventEmitter<Boolean>();
  mostrarAgregarEditar$ = new EventEmitter<Boolean>();

  mostrarEditarCliente$ = new EventEmitter<IDatosMostrar>();

  constructor( private http: HttpClient ) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  productos<R>(url: string): Observable<R[]>{

    return this.http.get<R[]>(`${this.url}/${url}`);

    // Actualizar encabezadps
    // this.httpOptions.headers =
  // this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
  }

  generico<R>(url: string): Observable<R[]>{
    return this.http.get<R[]>(`${this.url}/${url}`);
  }

  obtenerCliente<R>(url: string): Observable<R>{
    return this.http.get<R>(`${this.url}/${url}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );;
  }

  genericoGet<R>(url: string): Observable<R>{
    return this.http.get<R>(`${this.url}/${url}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  genericoPost<T,R>(url: string, t: T): Observable<R>{
    return this.http.post<R>(`${this.url}/${url}`, t)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  guardarCliente(url: string, cliente: ICliente ): Observable<IRespuestaDTO<ICliente>>{
    return this.http.post<IRespuestaDTO<ICliente>>(`${this.url}/${url}`, cliente).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  actualizarCliente(url: string, cliente: ICliente ): Observable<IRespuestaDTO<ICliente>>{
    return this.http.put<IRespuestaDTO<ICliente>>(`${this.url}/${url}/${cliente.id}`, cliente).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }



  eliminar<R>( id: number,url: string): Observable<R>{
     return this.http.delete<R>(`${this.url}/${url}/${id}`);
  }

  buscarId<R>( id: number,url: string): Observable<R>{
    return this.http.get<R>(`${this.url}/${url}/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
 }
  serviceGenerico<T,R>(t:T, url: string): Observable<R>{
    return this.http.post<R>(`${this.url}/${url}`, t)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  obtenerVistas(url: string): Observable<IRespuestaDTO<Array<IVistaCheck>>>{
    return this.http.get<IRespuestaDTO<Array<IVista>>>(`${this.url}/${url}`)
    .pipe(
      map(this.vistas),
      retry(2),
      catchError(this.handleError)
    );
  }
vistas( datos: IRespuestaDTO<Array<IVista>> ): IRespuestaDTO<Array<IVistaCheck>>
{
  let rec: IRespuestaDTO<Array<IVistaCheck>> = 
  {
    code: datos.code,
    codeValue: datos.codeValue,
    mensaje: datos.mensaje,
    t: datos.t.map((vista: IVista )=>{
      let vistaCheckMap: IVistaCheck =
      {
        id: vista.id,
        nombreVista: vista.nombreVista,
        isCheck: false
      }
      return vistaCheckMap;
    })
  };
  return rec;
}

  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }


}
