import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  throwError,
  catchError,
  BehaviorSubject,
  switchMap,
  filter,
  take,
  map,
} from 'rxjs';
import { SessionService } from '@app/shared/services/session/session.service';
import { AuthService } from '@app/auth/auth.service';
import { isExpired } from '@utils/app.utility';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshing: boolean = false;
  private _subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private session: SessionService, private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let req: HttpRequest<any> = request.clone();

    const token: string | null =
      this.session.token && !isExpired(this.session.token)
        ? this.session.token
        : null;

    let hasToken: boolean = false;
    try {
      hasToken = this.hasToken(request);
    } catch (error) {}
    if (token && !hasToken) {
      req = this.addToken(request, token);
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.refreshing) {
      this.refreshing = true;
      this._subject.next(null);

      const token: string | null =
        this.session.refreshToken && !isExpired(this.session.refreshToken)
          ? this.session.refreshToken
          : null;

      if (token) {
        return this.auth.loginViaToken(token).pipe(
          switchMap((res: any) => {
            this.refreshing = false;
            this.session.token = res.data.token;
            this.session.refreshToken = res.data.refreshToken;
            this._subject.next(this.session.token);

            return next.handle(this.addToken(req, this.session.token));
          }),
          catchError((error: any) => {
            this.refreshing = false;
            this.session.logout();
            return throwError(error);
          })
        );
      }
    }

    // If the request is unauthorized and request is calling
    // the /auth/refresh-token API that means the refresh token
    // is also expired then logout the user.
    if (req.url.includes('auth/refresh-token')) {
      this.session.logout();
    }

    return this._subject.pipe(
      filter((token: string) => token !== null),
      take(1),
      switchMap((token: string) => next.handle(this.addToken(req, token)))
    );
  }

  private hasToken(request: HttpRequest<any>) {
    let hasToken: boolean = false;

    try {
      const headers: any = request.headers;
      headers.lazyUpdate.forEach((item: any) => {
        if (item.name === 'Authorization') {
          hasToken = true;
        }
      });
    } catch (error) {}
    return hasToken;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
