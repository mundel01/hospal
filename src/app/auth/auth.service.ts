import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { distinctUntilChanged, first, map, Observable } from 'rxjs';

import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: any = env.api;

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.url}/password-login`, credentials);
  }

  loginViaToken(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.url}/auth/refresh-token`, {
      headers: headers,
    });
  }

  register(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }

  checkWorkspace(workspace: string) {
    return this.http.get(`${this.url}/check-workspace/${workspace}`);
  }

  uniqueWorkspaceValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkWorkspace(control.value).pipe(
        distinctUntilChanged(),
        map((res: any) => (res.isExists ? { workspaceExists: true } : null)),
        first()
      );
    };
  }
}
