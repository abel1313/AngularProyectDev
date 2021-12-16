import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
        catchError(err => {
            let errores: any;
            if (err instanceof HttpErrorResponse) { 
                if (err.status === 401) {
                    errores = err;
                }else
                {
                    errores = err;
                    
                }
             }
            return of(errores);
        })
    );
    }
}