import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
  constructor( private http: HttpClient ) { }



  productos<R>(url: string): Observable<R[]>{
    return this.http.get<R[]>(`${this.url}/${url}`);
  }
  eliminar<R>( id: number,url: string): Observable<R>{
    console.log(id, url);
    
     return this.http.delete<R>(`${this.url}/${url}/${id}`);
  }
  serviceGenerico<T,R>(t:T, url: string): Observable<R>{
    return this.http.post<R>(`${this.url}/${url}`, t)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
