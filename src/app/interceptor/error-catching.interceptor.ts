import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { GENERIC_ERROR_MESSAGE } from '@config/messages';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log(error.error.errors);

          try {
            if (_.isString(error.error.errors[0])) {
              errorMsg = `Error: ${error.error.errors[0]}`;
            } else {
              errorMsg = `Error: ${error.error.errors[0].message}`;
            }
          } catch (error) {
            errorMsg = GENERIC_ERROR_MESSAGE;
          }
        }
        return throwError(errorMsg);
      })
    );
  }
}
