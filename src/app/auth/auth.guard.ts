import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { SessionService } from '@app/shared/services/session/session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Auth guard', this.session.token);

    if (this.session.token) {
      return true;
    }

    return this.router.navigate(['/auth/login']);
  }
}
