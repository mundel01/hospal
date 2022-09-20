import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@custom-types/role.enum';
import { userFromToken } from '@utils/app.utility';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _token = '';
  private _refreshToken = '';
  private _user: any = null;
  private _subject: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );

  constructor(private storage: StorageService, private router: Router) {}

  private _check() {
    const _token: string = this.storage.get('_token');

    if (!_token) {
      this._subject.next(false);
      return false;
    }

    this._token = _token;
    this._user = this.storage.get('_user');

    if (!this._user) {
      this._user = userFromToken(this._token);
      this.storage.set('_user', this._user);
    }

    this._subject.next(true);
    return true;
  }

  get setup(): boolean {
    return !this.user.birthday || !this.user.workplace;
  }

  get token() {
    if (!this._token) {
      this._check();
    }

    return this._token;
  }

  set token(token: string) {
    this.storage.set('_token', token);
    this._token = token;
    // this._user = userFromToken(this._token);
    // this.storage.set('_user', this._user);
  }

  get user() {
    if (!this._user) {
      this._check();
    }

    return this._user;
  }

  get refreshToken() {
    if (!this._refreshToken) {
      this._refreshToken = this.storage.get('_refreshToken');
    }

    return this._refreshToken;
  }

  set refreshToken(token: string) {
    this.storage.set('_refreshToken', token);
    this._refreshToken = token;
  }

  isAuthorized() {
    return !!this.user;
  }

  hasRole(role: Role) {
    console.log('has role', role);
    console.log(this.user.role);
    return this.isAuthorized() && this.user.role?.name === role;
  }

  init(data: any) {
    console.log(data)
    this.storage.set('_token', data.tokenData.token);
    // this.storage.set('_refreshToken', refreshToken);
    this.storage.set('_user', data);
    this._token = this.storage.get('_token');
    this._user = this.storage.get('_user');
    // this._refreshToken = this.storage.get('_refreshToken');
    this._subject.next(true);
    this.router.navigate(['/']);
  }

  destroy() {
    this.storage.destroy();
    this._user = null;
    this._token = '';
    this._subject.next(false);
  }

  logout() {
    this.destroy();
    this.router.navigate(['/auth/login']);
  }

  subscribe(callback: (value: boolean) => void) {
    return this._subject.subscribe((value: boolean) => {
      callback(value);
    });
  }
}
